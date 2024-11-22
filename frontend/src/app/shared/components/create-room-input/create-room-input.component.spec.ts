import { ComponentFixture, TestBed } from '@angular/core/testing';

import { CreateRoomInputComponent } from './create-room-input.component';

describe('CreateRoomInputComponent', () => {
  let component: CreateRoomInputComponent;
  let fixture: ComponentFixture<CreateRoomInputComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [CreateRoomInputComponent]
    })
    .compileComponents();
    
    fixture = TestBed.createComponent(CreateRoomInputComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
