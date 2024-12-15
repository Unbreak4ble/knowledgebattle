import { ComponentFixture, TestBed } from '@angular/core/testing';

import { RoomRankingComponent } from './room-ranking.component';

describe('RoomRankingComponent', () => {
  let component: RoomRankingComponent;
  let fixture: ComponentFixture<RoomRankingComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [RoomRankingComponent]
    })
    .compileComponents();
    
    fixture = TestBed.createComponent(RoomRankingComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
