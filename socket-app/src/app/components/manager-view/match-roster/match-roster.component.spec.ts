import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { MatchRosterComponent } from './match-roster.component';

describe('MatchRosterComponent', () => {
  let component: MatchRosterComponent;
  let fixture: ComponentFixture<MatchRosterComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ MatchRosterComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(MatchRosterComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
