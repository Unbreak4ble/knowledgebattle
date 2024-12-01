import { ComponentFixture, TestBed } from '@angular/core/testing';

import { PlayersCountComponent } from './players-count.component';

describe('PlayersCountComponent', () => {
  let component: PlayersCountComponent;
  let fixture: ComponentFixture<PlayersCountComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [PlayersCountComponent]
    })
    .compileComponents();
    
    fixture = TestBed.createComponent(PlayersCountComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
