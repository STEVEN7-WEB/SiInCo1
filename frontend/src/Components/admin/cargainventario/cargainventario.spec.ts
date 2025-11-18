import { ComponentFixture, TestBed } from '@angular/core/testing';

import { Cargainventario } from './cargainventario';

describe('Cargainventario', () => {
  let component: Cargainventario;
  let fixture: ComponentFixture<Cargainventario>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [Cargainventario]
    })
    .compileComponents();

    fixture = TestBed.createComponent(Cargainventario);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
