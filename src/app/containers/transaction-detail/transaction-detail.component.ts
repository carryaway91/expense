import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { IncomeExpensesModel } from 'src/app/models/incomeExpenses.model';
import { IncomeExportService } from 'src/app/services/incomeExpenseService.service';

@Component({
  selector: 'app-transaction-detail',
  templateUrl: './transaction-detail.component.html',
  styleUrls: ['./transaction-detail.component.scss']
})
export class TransactionDetailComponent implements OnInit {
  transaction: IncomeExpensesModel | undefined;

  constructor(private iEs: IncomeExportService, private route: ActivatedRoute) {}

  ngOnInit(): void {
    this.route.paramMap.subscribe(data => {
      this.transaction = this.iEs.getSingleTransaction(+data.get('id')!)
    })
  }
}
