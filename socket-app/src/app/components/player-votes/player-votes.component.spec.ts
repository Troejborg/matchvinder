import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { PlayerVotesComponent } from './player-votes.component';

describe('PlayerVotesComponent', () => {
  let component: PlayerVotesComponent;
  let fixture: ComponentFixture<PlayerVotesComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ PlayerVotesComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(PlayerVotesComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
