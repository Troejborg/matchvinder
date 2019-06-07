import {Player} from './player';

export class VoteEntry {
  constructor(public player: Player, public voterId: string) {}
}
