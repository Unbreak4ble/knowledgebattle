import { ComponentFixture, TestBed } from '@angular/core/testing';

import { RoomAdminComponent } from './room-admin.component';

describe('RoomAdminComponent', () => {
  let component: RoomAdminComponent;
  let fixture: ComponentFixture<RoomAdminComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [RoomAdminComponent]
    })
    .compileComponents();
    
    fixture = TestBed.createComponent(RoomAdminComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
