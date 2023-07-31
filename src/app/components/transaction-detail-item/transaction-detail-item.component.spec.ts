import { ComponentFixture, TestBed } from '@angular/core/testing';

import { TransactionDetailItemComponent } from './transaction-detail-item.component';

describe('TransactionDetailItemComponent', () => {
  let component: TransactionDetailItemComponent;
  let fixture: ComponentFixture<TransactionDetailItemComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ TransactionDetailItemComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(TransactionDetailItemComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
