import { FiltersComponent } from './filters.component';
import { Filter } from '../../../core/models/filter';

describe('FiltersComponent', () => {
  let comp: FiltersComponent;
  let testFilter: Filter = { name: 'test', field: 'test', type: 'test', value: ['first', 'second'] };

  beforeEach(() => {
    comp = new FiltersComponent();
  });

  it('should define a component', () => {
    expect(comp).toBeDefined();
  });

  it('should have a filters property', () => {
    expect(comp.filters).toBeDefined();
  });

  it('should have a filterChange property', () => {
    expect(comp.filterChange).toBeDefined();
  });

  it('should have a FilterType property', () => {
    expect(comp.FilterType).toBeDefined();
  });

  it('should have a isFiltered property', () => {
    expect(comp.isFiltered).toBeDefined();
  });

  it('should have a isCollapsed property', () => {
    comp.isCollapsed = true;

    expect(comp.isCollapsed).toBeDefined();
    expect(comp.isCollapsed).toEqual(true);
  });

  it('should call apply() when reset() called', () => {
    let testApply = spyOn(comp, 'apply');

    comp.reset();
    expect(testApply).toHaveBeenCalled();
  });

  it('should clear values of filters when reset() called', () => {
    comp.filters = [testFilter, testFilter];

    comp.reset();
    expect(comp.filters[0].value).toBeNull();
    expect(comp.filters[1].value).toBeNull();
  });

  it('should call apply() when resetFilter() called', () => {
    let testApply = spyOn(comp, 'apply');
    let filter: Filter = { name: 'test', field: 'test', type: 'test' };

    comp.resetFilter(filter);
    expect(testApply).toHaveBeenCalled();
  });

  it('should clear filter value when resetFilter() called', () => {
    comp.resetFilter(testFilter);
    expect(testFilter.value).toBeNull();
  });
});
