import { Component, Input } from '@angular/core';
import { IncomeExpensesModel } from 'src/app/models/incomeExpenses.model';

@Component({
  selector: 'app-transaction-detail-item',
  templateUrl: './transaction-detail-item.component.html',
  styleUrls: ['./transaction-detail-item.component.scss']
})
export class TransactionDetailItemComponent {

  @Input() transaction: IncomeExpensesModel;
}
