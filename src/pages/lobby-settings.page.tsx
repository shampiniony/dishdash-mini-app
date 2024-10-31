import { useCallback } from 'react';
import Layout from '@/components/layout';
import { Slider } from '@/components/ui/slider';
import { useLobbyStore } from '@/shared/stores/lobby.store';
import { motion, AnimatePresence, cubicBezier } from 'framer-motion';
import { Settings } from '@/shared/types/settings.interface';
import { MainButton } from '@vkruglikov/react-telegram-web-app';
import { settingsUpdateEvent } from '@/shared/events/app-events/settings.event';

import { swipesEvent } from '@/shared/events/app-events/swipes.event';
import { Tags } from '@/modules/settings/tags';
import { Users } from '@/modules/settings/users';

const LobbySettingsPage = () => {
    const { settings } = useLobbyStore();
    const { priceMin, priceMax, maxDistance } = settings;

    // causes lag wihout callback
    const handleSettingsChange = useCallback((newSettings: Settings) => {
        settingsUpdateEvent.update(newSettings);
    }, []);

    const onPriceChange = (value: number[]) => {
        handleSettingsChange({
            priceMin: value[0],
            priceMax: value[0],
            maxDistance,
            tags: settings.tags,
            location: settings.location,
        });
    };

    
    const pageVariants = {
        initial: { opacity: 0 },
        animate: {
            opacity: 1,
            transition: { duration: 2, ease: cubicBezier(0.16, 1, 0.3, 1) },
        },
        exit: {
            opacity: 0,
            transition: { duration: 0.2, ease: cubicBezier(0.7, 0.84, 0, 0) },
        },
    };

    return (
        <Layout>
            <AnimatePresence mode="wait">
                <motion.div
                    key="lobbySettings"
                    initial="initial"
                    animate="animate"
                    exit="exit"
                    variants={pageVariants}
                    className="flex flex-col h-screen items-center justify-between w-full p-0 bg-background"
                >
                    <div className="flex flex-col items-center justify-center w-[90%] max-w-lg">
                        <div className="flex w-full justify-between items-center">
                            <h3 className="text-2xl font-medium my-4 w-full text-left">
                                Настройки
                            </h3>
                            <Users /> 
                        </div>

                        <div className="space-y-4 mb-8 w-full">
                            <Tags/>
                        </div>
                    </div>

                    <div className="mb-5 w-[90%] max-w-lg">
                        <div className="flex justify-between items-center mb-2">
                            <p className="text-md font-medium">Средняя цена</p>
                            <p className="text-md font-medium">
                                {(priceMin + priceMax) / 2 || 0} ₽
                            </p>{' '}
                        </div>
                        <Slider
                            className="mt-1 mb-1"
                            value={[(priceMin + priceMax) / 2 || 0]}
                            onValueChange={onPriceChange}
                            max={3000}
                            min={0}
                            step={100}
                            id="price"
                        />
                        <div className="flex justify-between text-sm text-gray-500 mt-1 mb-2">
                            <p>0 ₽</p>
                            <p>3 000 ₽</p>
                        </div>
                    </div>

                    <MainButton onClick={() => swipesEvent.start()} text="Начать" />
                </motion.div>
            </AnimatePresence>
        </Layout>
    );
};

export default LobbySettingsPage;
