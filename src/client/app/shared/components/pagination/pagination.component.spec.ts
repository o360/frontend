import { PaginationComponent } from './pagination.component';
import { EventEmitter, SimpleChange } from '@angular/core';

export function main() {
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

    it('ngOnChanges', () => {
      comp.meta = {
        number: 6,
        size: 6,
        total: 1
      };
      comp.ngOnChanges({
        meta: new SimpleChange(null, comp.meta, true)
      });

      // expect(comp.pagination).toBeDefined();
      expect(comp.pagination.nativeElement.hidden).toEqual(false);
      // expect(comp.queryParamsChange).toEqual({ number: '10' });
    });

    it('sizeChanged', () => {
      comp.sizeChanged(10);
      expect(comp.queryParamsChange).toEqual(jasmine.any(EventEmitter));
      // expect(comp.queryParamsChange).toEqual({ number: '10' });
    });

    it('pageChanged', () => {
      comp.pageChanged(10);
      // expect(comp.queryParamsChange).toEqual(jasmine.any(EventEmitter));
    });
  });
}

