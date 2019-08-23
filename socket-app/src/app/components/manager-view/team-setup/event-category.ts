import {EventType} from '../../../models/event-type';

export interface EventCategory {
  title: string;
  eventTypes: EventType[];
}
