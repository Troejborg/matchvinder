import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { VotingProgressComponent } from './voting-progress.component';

describe('VotingProgressComponent', () => {
  let component: VotingProgressComponent;
  let fixture: ComponentFixture<VotingProgressComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ VotingProgressComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(VotingProgressComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
