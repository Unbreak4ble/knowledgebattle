import { ComponentFixture, TestBed } from '@angular/core/testing';

import { CoutdownComponent } from './coutdown.component';

describe('CoutdownComponent', () => {
  let component: CoutdownComponent;
  let fixture: ComponentFixture<CoutdownComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [CoutdownComponent]
    })
    .compileComponents();
    
    fixture = TestBed.createComponent(CoutdownComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
