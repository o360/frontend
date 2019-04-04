import { EventModel, EventState } from './event-model';

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
      expect(JSON.stringify(model.toJson())).toEqual('{"notifications":[],"start":"2017-06-23T11:03:45","end":"2017-06-23T11:03:45"}');
    });

    it('should have define state of assessment made by user', () => {
      model.start = '2017-06-23T11:03:45';
      model.end = '2017-06-23T11:03:45';
      model.userInfo = {
        totalFormsCount: 2,
        answeredFormsCount: 0
      };
      expect(model.state).toEqual(EventState.NotStarted);

      model.userInfo.answeredFormsCount = 1;
      expect(model.state).toEqual(EventState.PartiallyFilled);

      model.userInfo.answeredFormsCount = 2;
      expect(model.state).toEqual(EventState.FullFilled);
    });

    it('should have a properties by default', () => {
      expect(model.notifications).toEqual([]);
    });
  });
}
