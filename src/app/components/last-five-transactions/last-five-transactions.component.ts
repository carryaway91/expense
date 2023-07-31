import { Component, OnDestroy, OnInit } from '@angular/core';
import { Subscription } from 'rxjs';
import { IncomeExpensesGraphModel, IncomeExpensesModel } from 'src/app/models/incomeExpenses.model';
import { IncomeExportService } from 'src/app/services/incomeExpenseService.service';

@Component({
  selector: 'last-five-transactions',
  templateUrl: './last-five-transactions.component.html',
  styleUrls: ['./last-five-transactions.component.scss']
})
export class LastFiveTransactionsComponent implements OnInit, OnDestroy {
  lastFiveTransactions: IncomeExpensesModel[];
  sub: Subscription[] = [];

  constructor(private iEs: IncomeExportService) {}

  ngOnInit(): void {
    this.lastFiveTransactions = this.iEs.lastFiveTransactions
    this.sub.push(this.iEs.addLastFiveTransactionsChanged.subscribe(transactions => {
      this.lastFiveTransactions = transactions
    }))
  }

  ngOnDestroy(): void {
    this.sub.forEach(s => s.unsubscribe())
  }
}
