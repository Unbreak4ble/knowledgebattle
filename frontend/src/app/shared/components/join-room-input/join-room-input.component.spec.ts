import { ComponentFixture, TestBed } from '@angular/core/testing';

import { JoinRoomInputComponent } from './join-room-input.component';

describe('JoinRoomInputComponent', () => {
  let component: JoinRoomInputComponent;
  let fixture: ComponentFixture<JoinRoomInputComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [JoinRoomInputComponent]
    })
    .compileComponents();
    
    fixture = TestBed.createComponent(JoinRoomInputComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
