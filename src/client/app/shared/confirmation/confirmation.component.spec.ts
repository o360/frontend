import { ConfirmationModalComponent } from './confirmation.component';
import { Subject } from 'rxjs/Subject';

export function main() {
  describe('ConfirmationModalComponent', () => {
    let comp: ConfirmationModalComponent;

    beforeEach(() => {
      comp = new ConfirmationModalComponent();
    });

    it('should define a component', () => {
      expect(comp).toBeDefined();
    });

    // @todo: Uncomment and fix test
/*    it('should have conflictsKeys', () => {
      comp.conflicts = ['first', 'second'];
      comp.ngOnInit();

      expect(comp.conflicts).toBeDefined();
      expect(comp.conflictKeys).toBeDefined();
      expect(comp.conflictKeys).toEqual([ '0', '1' ]);
    });*/

    it('should have a confirmed property', () => {
      expect(comp.confirmed).toBeDefined();
    });

    it('should have a message property', () => {
      expect(comp.message).toBeDefined();
      comp.message = 'testMessage';
      expect(comp.message).toEqual('testMessage');
    });

    // @todo: Uncomment and fix test
/*    it('submit', () => {
      comp.submit();
      expect(comp.confirmed).toEqual(jasmine.any(Subject));
    });*/
  });
}
