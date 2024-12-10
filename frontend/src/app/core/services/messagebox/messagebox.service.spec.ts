import { TestBed } from '@angular/core/testing';

import { MessageboxService } from './messagebox.service';

describe('MessageboxService', () => {
  let service: MessageboxService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(MessageboxService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
