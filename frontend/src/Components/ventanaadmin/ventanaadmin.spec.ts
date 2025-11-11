import { ComponentFixture, TestBed } from '@angular/core/testing';

import { Ventanaadmin } from './ventanaadmin';

describe('Ventanaadmin', () => {
  let component: Ventanaadmin;
  let fixture: ComponentFixture<Ventanaadmin>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [Ventanaadmin]
    })
    .compileComponents();

    fixture = TestBed.createComponent(Ventanaadmin);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
