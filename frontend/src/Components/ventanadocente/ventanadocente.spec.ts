import { ComponentFixture, TestBed } from '@angular/core/testing';

import { Ventanadocente } from './ventanadocente';

describe('Ventanadocente', () => {
  let component: Ventanadocente;
  let fixture: ComponentFixture<Ventanadocente>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [Ventanadocente]
    })
    .compileComponents();

    fixture = TestBed.createComponent(Ventanadocente);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
