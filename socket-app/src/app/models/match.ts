import Team from './team';
import {Player} from './player';

export interface Match {
  homeTeam:  Team;
  awayTeam: string;
  date: Date;
  completed: boolean;
  goalsFor: number;
  goalsAgainst: number;
  teamSheet: Player[];
}
