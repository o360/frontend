import { Injectable } from '@angular/core';
import { RestServiceConfig } from '../decorators/rest-service-config.decorator';
import { RestService } from './rest.service';
import { EventModel } from '../models/event-model';

@Injectable()
@RestServiceConfig({
  entityName: 'events',
  entityConstructor: EventModel
})
export class EventService extends RestService<EventModel> {
}
