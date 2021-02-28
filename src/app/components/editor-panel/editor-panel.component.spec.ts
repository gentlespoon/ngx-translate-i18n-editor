import { ComponentFixture, TestBed, waitForAsync } from '@angular/core/testing';

import { EditorPanelComponent } from './editor-panel.component';

describe('EditorPanelComponent', () => {
  let component: EditorPanelComponent;
  let fixture: ComponentFixture<EditorPanelComponent>;

  beforeEach(waitForAsync(() => {
    TestBed.configureTestingModule({
      declarations: [ EditorPanelComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(EditorPanelComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
