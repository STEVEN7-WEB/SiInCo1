import { ComponentFixture, TestBed } from '@angular/core/testing';

import { Verreportes } from './verreportes';

describe('Verreportes', () => {
  let component: Verreportes;
  let fixture: ComponentFixture<Verreportes>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [Verreportes]
    })
    .compileComponents();

    fixture = TestBed.createComponent(Verreportes);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
