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
    this.totalLimit = this.iEs.getTotalLimit()
    this.sub.push(this.iEs.limitForCurrentMonthChanged.subscribe(val => {
      this.totalLimit = val
    }))
    this.currentMonth = this.iEs.getCurrentMonth()
    this.mostSpentNum = this.iEs.mostSpendingOn.mostSpentOnNumber
    this.mostSpentString = this.iEs.mostSpendingOn.mostSpentOnString
    this.sub.push(this.iEs.mostSpendingOnChanged.subscribe(val => {
      this.mostSpentNum = val.mostSpentOnNumber;
      this.mostSpentString = val.mostSpentOnString
    }))
  }

  ngOnDestroy(): void {
    this.sub.map(s => s.unsubscribe())
  }
  onDialogVisible(visible: any) {
    this.dialogVisible = visible
  }
}
