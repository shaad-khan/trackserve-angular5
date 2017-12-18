import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { ServermonitorComponent } from './servermonitor.component';

describe('ServermonitorComponent', () => {
  let component: ServermonitorComponent;
  let fixture: ComponentFixture<ServermonitorComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ ServermonitorComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(ServermonitorComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should be created', () => {
    expect(component).toBeTruthy();
  });
});
