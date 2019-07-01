import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { MatchesPlayedComponent } from './matches-played.component';

describe('MatchesPlayedComponent', () => {
  let component: MatchesPlayedComponent;
  let fixture: ComponentFixture<MatchesPlayedComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ MatchesPlayedComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(MatchesPlayedComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
