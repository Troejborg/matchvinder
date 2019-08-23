import Team from './team';

export interface Match {
  homeTeam:  Team;
  awayTeam: string;
  date: Date;
  state: string;
  goalsFor: number;
  goalsAgainst: number;
}
