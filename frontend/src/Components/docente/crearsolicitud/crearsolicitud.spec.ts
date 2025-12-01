import { ComponentFixture, TestBed } from '@angular/core/testing';

import { Crearsolicitud } from './crearsolicitud';

describe('Crearsolicitud', () => {
  let component: Crearsolicitud;
  let fixture: ComponentFixture<Crearsolicitud>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [Crearsolicitud]
    })
    .compileComponents();

    fixture = TestBed.createComponent(Crearsolicitud);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
