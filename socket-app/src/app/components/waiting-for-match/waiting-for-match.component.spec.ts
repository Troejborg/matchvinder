import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { WaitingForMatchComponent } from './waiting-for-match.component';

describe('WaitingForMatchComponent', () => {
  let component: WaitingForMatchComponent;
  let fixture: ComponentFixture<WaitingForMatchComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ WaitingForMatchComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(WaitingForMatchComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
