import { ComponentFixture, TestBed } from '@angular/core/testing';

import { Verinventario } from './verinventario';

describe('Verinventario', () => {
  let component: Verinventario;
  let fixture: ComponentFixture<Verinventario>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [Verinventario]
    })
    .compileComponents();

    fixture = TestBed.createComponent(Verinventario);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
