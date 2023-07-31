import { Component, OnInit } from "@angular/core";
import { IncomeExportService } from "src/app/services/incomeExpenseService.service";
import { IncomeExpensesGraphModel } from "src/app/models/incomeExpenses.model";

@Component({
  selector: 'app-graph',
  templateUrl: './overviewGraph.component.html',
  styleUrls: ['./overviewGraph.component.scss']
})
export class OverviewGraphComponent implements OnInit {
  amount: number;
  type: string;
  maxHeight: number = 300;
  maxAmount: number = 0;
  data: IncomeExpensesGraphModel[];

  constructor(private iEs: IncomeExportService) {
    this.data = this.iEs.data
  }

  ngOnInit(): void {
    setTimeout(() => {
      this.iEs.setMaxHight(1, 0)
    }, 300)
    this.iEs.incomeChanged.next(this.data[0].amount)
    this.iEs.expensesChanged.next(this.data[1].amount)
  }


}
