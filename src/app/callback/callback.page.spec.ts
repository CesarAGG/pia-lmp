import { ComponentFixture, TestBed } from '@angular/core/testing';
import { CallbackPage } from './callback.page';

describe('CallbackPage', () => {
  let component: CallbackPage;
  let fixture: ComponentFixture<CallbackPage>;

  beforeEach(async(() => {
    fixture = TestBed.createComponent(CallbackPage);
    component = fixture.componentInstance;
    fixture.detectChanges();
  }));

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
