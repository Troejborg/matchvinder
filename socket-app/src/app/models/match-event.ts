import {EventType} from './event-type';
import {Player} from './player';

export class Event {
  eventType: EventType;
  assignee: Player;
  date: Date;
}
