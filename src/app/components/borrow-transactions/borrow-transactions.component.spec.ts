import { ComponentFixture, TestBed } from '@angular/core/testing';

import { BorrowTransactionsComponent } from './borrow-transactions.component';

describe('BorrowTransactionsComponent', () => {
  let component: BorrowTransactionsComponent;
  let fixture: ComponentFixture<BorrowTransactionsComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [BorrowTransactionsComponent]
    })
    .compileComponents();

    fixture = TestBed.createComponent(BorrowTransactionsComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
