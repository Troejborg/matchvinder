import Team from './team';
import {Player} from './player';
import {EventType} from './event-type';

export interface MatchEvent {
  eventType: EventType;
  assignee: Player;
  text: string;
}

export interface Match {
  _id: string;
  homeTeam:  Team;
  awayTeam: string;
  date: Date;
  state: string;
  goalsFor: number;
  goalsAgainst: number;
  teamSheet: Player[];
  matchEvents: MatchEvent[];
}
