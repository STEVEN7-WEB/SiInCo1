import { ComponentFixture, TestBed } from '@angular/core/testing';

import { Ventanausuario } from './ventanausuario';

describe('Ventanausuario', () => {
  let component: Ventanausuario;
  let fixture: ComponentFixture<Ventanausuario>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [Ventanausuario]
    })
    .compileComponents();

    fixture = TestBed.createComponent(Ventanausuario);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
