import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ControlEspecial } from './control-especial';

describe('ControlEspecial', () => {
  let component: ControlEspecial;
  let fixture: ComponentFixture<ControlEspecial>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [ControlEspecial]
    })
    .compileComponents();

    fixture = TestBed.createComponent(ControlEspecial);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
