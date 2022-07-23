import { TestBed } from '@angular/core/testing';

import { BookListResolverService } from './book-list-resolver.service';

describe('BookListResolverService', () => {
  let service: BookListResolverService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(BookListResolverService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
