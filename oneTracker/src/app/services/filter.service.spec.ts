import { TestBed } from '@angular/core/testing';
import { FilterService } from './filter.service';

describe('FilterService', () => {
  let service: FilterService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(FilterService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });

  it('should set and get filter value', () => {
    const testFilter = 'testFilter';

    // Set filter
    service.setFilter(testFilter);

    // Get filter
    service.getFilter().subscribe((filter) => {
      expect(filter).toBe(testFilter);
    });
  });
});
