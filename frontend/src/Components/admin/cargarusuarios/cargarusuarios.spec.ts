import { ComponentFixture, TestBed } from '@angular/core/testing';

import { Cargarusuarios } from './cargarusuarios';

describe('Cargarusuarios', () => {
  let component: Cargarusuarios;
  let fixture: ComponentFixture<Cargarusuarios>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [Cargarusuarios]
    })
    .compileComponents();

    fixture = TestBed.createComponent(Cargarusuarios);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
