import { ComponentFixture, TestBed } from '@angular/core/testing';

import { OlvideContrasena } from './olvide-contrasena';

describe('OlvideContrasena', () => {
  let component: OlvideContrasena;
  let fixture: ComponentFixture<OlvideContrasena>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [OlvideContrasena]
    })
    .compileComponents();

    fixture = TestBed.createComponent(OlvideContrasena);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
