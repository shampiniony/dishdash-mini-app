import { getLobbyStoreMethods } from '@/shared/stores/lobby.store';
import { getMatchStoreMethods } from '@/shared/stores/match.store';
import { Match } from '@/shared/types/match.interface';
import { Event } from '../event';

class MatchEvent extends Event {
  handle(data: Match) {
    console.log(data);

    const { setMatchCard } = getMatchStoreMethods();
    const { setState, state } = getLobbyStoreMethods();

    if (state == 'results') return; 

    setState('match');
    setMatchCard({
      card: data.card
    });
  }
}

export const matchEvent = new MatchEvent();
