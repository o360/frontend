import { PaginationComponent } from './pagination.component';
import { EventEmitter } from '@angular/core';

describe('PaginationComponent', () => {
  let comp: PaginationComponent;

  beforeEach(() => {
    comp = new PaginationComponent();
  });

  it('should define a component', () => {
    expect(comp).toBeDefined();
  });

  it('should have a sizes properties', () => {
    expect(comp.sizes).toBeDefined();
  });

  it('should have a queryParamsChange properties', () => {
    expect(comp.queryParamsChange).toBeDefined();
  });

  it('should have a meta properties', () => {
    comp.meta = {
      number: 6,
      size: 6,
      total: 1
    };
    expect(comp.meta).toBeDefined();
  });

  it('should call sizeChanged', () => {
    comp.sizeChanged(10);
    expect(comp.queryParamsChange).toEqual(jasmine.any(EventEmitter));
  });
});

