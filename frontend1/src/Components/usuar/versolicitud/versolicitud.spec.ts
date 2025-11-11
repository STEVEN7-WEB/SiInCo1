import { ComponentFixture, TestBed } from '@angular/core/testing';

import { Versolicitud } from './versolicitud';

describe('Versolicitud', () => {
  let component: Versolicitud;
  let fixture: ComponentFixture<Versolicitud>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [Versolicitud]
    })
    .compileComponents();

    fixture = TestBed.createComponent(Versolicitud);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
