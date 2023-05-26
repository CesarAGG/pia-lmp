import { ComponentFixture, TestBed } from '@angular/core/testing';
import { MateriaPage } from './materia.page';

describe('MateriaPage', () => {
  let component: MateriaPage;
  let fixture: ComponentFixture<MateriaPage>;

  beforeEach(async(() => {
    fixture = TestBed.createComponent(MateriaPage);
    component = fixture.componentInstance;
    fixture.detectChanges();
  }));

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
