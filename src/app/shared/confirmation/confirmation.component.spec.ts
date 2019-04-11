import { ConfirmationModalComponent } from './confirmation.component';

describe('ConfirmationModalComponent', () => {
  let comp: ConfirmationModalComponent;

  beforeEach(() => {
    comp = new ConfirmationModalComponent();
  });

  it('should define a component', () => {
    expect(comp).toBeDefined();
  });

  it('should have conflictsKeys', () => {
    comp.conflicts = { projects: [{ id: '1', name: 'first' }] };
    comp.ngOnInit();

    expect(comp.conflicts).toBeDefined();
    expect(comp.conflictKeys).toBeDefined();
    expect(comp.conflictKeys).toEqual(['projects']);
  });

  it('should have a confirmed property', () => {
    expect(comp.confirmed).toBeDefined();
  });

  it('should have a message property', () => {
    expect(comp.message).toBeDefined();
    comp.message = 'testMessage';
    expect(comp.message).toEqual('testMessage');
  });
});
