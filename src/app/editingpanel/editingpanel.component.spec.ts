import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { EditingpanelComponent } from './editingpanel.component';

describe('EditingpanelComponent', () => {
  let component: EditingpanelComponent;
  let fixture: ComponentFixture<EditingpanelComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ EditingpanelComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(EditingpanelComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
