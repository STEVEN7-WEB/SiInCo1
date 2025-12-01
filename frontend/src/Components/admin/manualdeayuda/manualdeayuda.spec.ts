import { ComponentFixture, TestBed } from '@angular/core/testing';

import { Manualdeayuda } from './manualdeayuda';

describe('Manualdeayuda', () => {
  let component: Manualdeayuda;
  let fixture: ComponentFixture<Manualdeayuda>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [Manualdeayuda]
    })
    .compileComponents();

    fixture = TestBed.createComponent(Manualdeayuda);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
