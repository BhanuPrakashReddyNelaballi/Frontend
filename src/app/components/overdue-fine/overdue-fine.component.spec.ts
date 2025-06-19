import { ComponentFixture, TestBed } from '@angular/core/testing';

import { OverdueFineComponent } from './overdue-fine.component';

describe('OverdueFineComponent', () => {
  let component: OverdueFineComponent;
  let fixture: ComponentFixture<OverdueFineComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [OverdueFineComponent]
    })
    .compileComponents();

    fixture = TestBed.createComponent(OverdueFineComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
