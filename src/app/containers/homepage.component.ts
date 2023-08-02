import { Component, OnDestroy, OnInit } from "@angular/core";
import { IncomeExpensesGraphModel } from "../models/incomeExpenses.model";
import { IncomeExportService } from "../services/incomeExpenseService.service";
import { Subscription } from "rxjs";

@Component({
  selector: 'app-homepage',
  templateUrl: './homepage.component.html',
  styleUrls: ['./homepage.component.scss']
})
export class HomepageComponent implements OnInit, OnDestroy {
  dialogVisible: boolean = false;
  mostSpentNum: number;
  mostSpentString: string| undefined;
  sub: Subscription[] = [];
  currentMonth: string = ''
  totalLimit: number;

  constructor(private iEs: IncomeExportService) {}

  ngOnInit() {
    this.mostSpentNum = this.iEs.getBiggestSpending().amount
    this.mostSpentString = this.iEs.getBiggestSpending().name
    this.iEs.biggestSpending$.subscribe(val => {
      this.mostSpentNum = val.amount
      this.mostSpentString = val.name
    })
    this.totalLimit = this.iEs.getTotalLimit()
    this.sub.push(this.iEs.limitForCurrentMonthChanged.subscribe(val => {
      this.totalLimit = val
    }))
    this.sub.push(this.iEs.biggestSpending$.subscribe(val => {
    }))
    this.currentMonth = this.iEs.getCurrentMonth()

  }

  ngOnDestroy(): void {
    this.sub.map(s => s.unsubscribe())
  }
  onDialogVisible(visible: any) {
    this.dialogVisible = visible
  }
}
