import { formatDate } from "@angular/common";
import { Component, EventEmitter, Output } from "@angular/core";
import { FormControl } from "@angular/forms";
import { GraphColumn } from "src/app/enums/graph-column";
import { Category } from "src/app/models/category.model";
import { IncomeExpensesGraphModel } from "src/app/models/incomeExpenses.model";
import { IncomeExportService } from "src/app/services/incomeExpenseService.service";
import { UIService } from "src/app/services/ui.service";
import {NgForm} from '@angular/forms';

@Component({
  selector: 'add-income-expenses-component',
  templateUrl: './addIncomeExpenses.component.html',
  styleUrls: ['./addIncomeExpenses.component.scss']
})
export class AddIncomeExpensesComponent {
  @Output() emitDialogClosed = new EventEmitter()
  categoryList = new FormControl('')
  amount: number;
  type: string;
  maxHeight: number = 300;
  maxAmount: number = 0;
  data: IncomeExpensesGraphModel[];
  categories: Category[] = [];
  selected_type: string = GraphColumn.EXPENSE;
  selected_category: string = 'food_id';
  date: string = formatDate(new Date(), "yyyy-MM-dd", "en");

  constructor(private iEs: IncomeExportService, private uIs: UIService) {
    this.data = this.iEs.data;
    this.categories = this.iEs.getCategories();
    console.log(this.categories)
  }

  onSubmit(form: NgForm) {
    const value = form.form.value
    if(value.type === GraphColumn.INCOME) {
      this.data[0].amount += value.amount
      this.iEs.setIncome(this.data[0].amount)
    } else {
      this.data[1].amount += value.amount
      this.iEs.setExpenses(this.data[1].amount)
    }
    const id = Math.round(Math.random() * 10000000000);
    let data = {id: id, amount: value.amount, type: value.type, category_id: value.category_id, date: value.date, note: value.note}
    this.iEs.setMaxHight(1, 0)
    this.iEs.addToAllTransactions(data)
    form.controls['amount'].setValue('')
    this.iEs.getBiggestSpending()
  }

  add(form: NgForm) {
    this.onSubmit(form)
  }

  addAndClose(form: NgForm) {
    this.onSubmit(form)
    this.uIs.toggleIncomeDalogVisible(false)
  }
}
