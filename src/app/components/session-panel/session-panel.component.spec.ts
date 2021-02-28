import { ComponentFixture, TestBed, waitForAsync } from '@angular/core/testing';

import { SessionPanelComponent } from './session-panel.component';

describe('SessionPanelComponent', () => {
  let component: SessionPanelComponent;
  let fixture: ComponentFixture<SessionPanelComponent>;

  beforeEach(waitForAsync(() => {
    TestBed.configureTestingModule({
      declarations: [ SessionPanelComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(SessionPanelComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
