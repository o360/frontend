import { Defaults } from '../decorators/defaults.decorator';
import { EventModel } from './event-model';
import * as moment from 'moment';

@Defaults({
  start: moment().add(1, 'hour'),
  end:  moment().add(2, 'hour'),
  canRevote: false,
  notifications: []
})

export function main() {
  describe('EventModel class', () => {
    let model: EventModel;

    beforeEach(() => {
      model = new EventModel();
    });

    it('should be defined', () => {
      expect(EventModel).toBeDefined();
      expect(model).toBeDefined();
      expect(model instanceof EventModel).toBeTruthy();
    });

    it('should convert an object to json', () => {
      model.start = '2017-06-23T11:03:45';
      model.end = '2017-06-23T11:03:45';
      expect(model.toJson()).toEqual('{"start":"2017-06-23T11:03:45","end":"2017-06-23T11:03:45","canRevote":false,"notifications":[]}');
    });

    it('should have a properties by default', () => {
      expect(model.canRevote).toEqual(false);
      expect(model.notifications).toEqual([]);
    });
  });
}
