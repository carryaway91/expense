import { Component, OnDestroy, OnInit } from '@angular/core';
import { Subscription } from 'rxjs';
import { IncomeExpensesModel } from 'src/app/models/incomeExpenses.model';
import { IncomeExportService } from 'src/app/services/incomeExpenseService.service';

@Component({
  selector: 'detail-page',
  templateUrl: './detail-page.component.html',
  styleUrls: ['./detail-page.component.scss']
})
export class DetailPageComponent implements OnInit, OnDestroy {
  public allTransactions: IncomeExpensesModel[] = []
  subs: Subscription[] = []

  constructor(private iEs: IncomeExportService) {}

  ngOnInit() {
    this.allTransactions = this.iEs.getAllTransaction()
    this.subs.push(this.iEs.allTransactionsChanged.subscribe(val => {
      this.allTransactions = val
    }))
  }

  ngOnDestroy(): void {
    this.subs.forEach(s => s.unsubscribe())
  }
}
