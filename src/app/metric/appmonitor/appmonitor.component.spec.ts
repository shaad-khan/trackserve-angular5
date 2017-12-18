import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { AppmonitorComponent } from './appmonitor.component';

describe('AppmonitorComponent', () => {
  let component: AppmonitorComponent;
  let fixture: ComponentFixture<AppmonitorComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ AppmonitorComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(AppmonitorComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should be created', () => {
    expect(component).toBeTruthy();
  });
});
