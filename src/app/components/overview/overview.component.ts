import { Component, OnDestroy, OnInit } from "@angular/core";
import { Subscription } from "rxjs";
import { IncomeExportService } from "src/app/services/incomeExpenseService.service";

@Component({
  selector: 'overview',
  templateUrl: './overview.component.html',
  styleUrls: ['./overview.component.scss']
})
export class OverviewComponent implements OnInit, OnDestroy {
  income: number;
  expense: number;
  subs: Subscription[] = [];
  currentMonth: string;
  constructor(private iEs: IncomeExportService) {}

  ngOnInit(): void {
    this.currentMonth = this.iEs.getCurrentMonth()
    this.income = this.iEs.incomeTotal
    this.expense = this.iEs.expensesTotal
    this.subs.push(this.iEs.incomeChanged.subscribe(val => {
      console.log(val)
      this.income = val
    }))
    this.subs.push(this.iEs.expensesChanged.subscribe(val => {
      this.expense = val
    }))
  }

  ngOnDestroy(): void {
    this.subs.forEach(sub => sub.unsubscribe())
  }
}
