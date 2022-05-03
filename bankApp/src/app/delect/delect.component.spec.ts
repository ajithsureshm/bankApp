import { ComponentFixture, TestBed } from '@angular/core/testing';

import { DelectComponent } from './delect.component';

describe('DelectComponent', () => {
  let component: DelectComponent;
  let fixture: ComponentFixture<DelectComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ DelectComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(DelectComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
