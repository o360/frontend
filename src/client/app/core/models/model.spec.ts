import { Model, ModelId } from './model';
import { Defaults } from '../decorators/defaults.decorator';

@Defaults({
  name: 'test'
})
export class TestModel extends Model {
  public id: ModelId;
  public name: string;
}

export function main() {
  describe('Model class', () => {
    let model: TestModel;

    beforeEach(() => {
      model = new TestModel();
    });

    it('should be defined', () => {
      expect(TestModel).toBeDefined();
      expect(model).toBeDefined();
      expect(model instanceof TestModel).toBeTruthy();
    });

    it('should convert an object to json', () => {
      expect(model.toJson()).toEqual('{"name":"test"}');
    });
  });
}
