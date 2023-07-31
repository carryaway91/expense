import { formatDate } from '@angular/common';
import { Component, ElementRef, OnDestroy, OnInit, ViewChild } from '@angular/core';
import { NgForm } from '@angular/forms';
import { Subscription } from 'rxjs';
import { categories } from 'src/app/data/data';
import { GraphColumn } from 'src/app/enums/graph-column';
import { Category } from 'src/app/models/category.model';
import { LimitModel } from 'src/app/models/incomeExpenses.model';
import { IncomeExportService } from 'src/app/services/incomeExpenseService.service';
import { UIService } from 'src/app/services/ui.service';

@Component({
  selector: 'app-limit',
  templateUrl: './limit.component.html',
  styleUrls: ['./limit.component.scss']
})
export class LimitComponent implements OnInit, OnDestroy {
  @ViewChild('categoryInputValue') inputRef: ElementRef;
  @ViewChild('overalValueInput') generalInputRef: ElementRef;

  public limit: number;
  public currentMonth: string;
  public limitFormVisible: boolean = false;
  public subs: Subscription[] = []
  public totalLimit: number = 0;
  public availableCategories: Category[] = [];
  public limits: LimitModel[] = [];
  public overallDisabled: boolean = false;
  public showTotalAmountInput: boolean = true;
  public selectedCategoryID: string = '';
  public preSelectedCategory: string;
  public categoriesVisible:  boolean = false;
  public showAddCategoryTooltip: boolean = false;

  constructor(private iEs: IncomeExportService, private uIs: UIService) {}


  ngOnInit(): void {
    this.preSelectedCategory = categories[1].id
    this.limit = this.iEs.limitForCurrentMonth
    this.currentMonth = this.iEs.getCurrentMonth()
    this.subs.push(this.uIs.addLimitFormVisibilityChanged.subscribe(val => {
      this.limitFormVisible = val
    }))
    this.subs.push(this.iEs.limitForCurrentMonthChanged.subscribe(val => {
      this.totalLimit = val
    }))
    this.subs.push(this.iEs.categoriesChanged.subscribe(val => {
      this.availableCategories = val
    }))
    this.iEs.limitForCurrentMonthChanged.subscribe(val => this.limit = val)
    this.availableCategories = this.iEs.categoriesList.filter(c => c.type_id !== GraphColumn.INCOME)
  }

  ngOnDestroy() {
    this.subs.map(s => s.unsubscribe())
  }


  onClicked() {
    this.uIs.toggleAddLimit(!this.limitFormVisible)
  }

  onChangePreselected(e: any) {
    this.preSelectedCategory = e.target.value
  }


  onRemoveFromAvailable(id: string) {
    console.log(id)
    if(id) {
      this.availableCategories = this.availableCategories.filter(c => c.id !== id)
      console.log(this.availableCategories)
    }
  }

  addLimit() {
    const option = document.getElementById('category') as HTMLInputElement
    this.onRemoveFromAvailable(option.value)
    this.limits.push({
      id: Math.round(Math.random() * 11111111111111111111111) + '',
      name: categories.find(c => c.id === option.value)!.name,
      amount: this.inputRef.nativeElement.value,
      month: formatDate(new Date(), "yyyy-MM-dd", "en")
    })
   this.onRemoveFromAvailable(option.value)
   this.totalLimit += +this.inputRef.nativeElement.value
   this.inputRef.nativeElement.value = ''
  }

  addToTotalLimitGeneral() {
    this.totalLimit = +this.generalInputRef.nativeElement.value
  }


  addToTotalLimit(e: any, index: number) {
    this.totalLimit += +e.target.value
    this.limits[index].amount = +e.target.value
    console.log(this.limits)
  }

  onSubmit() {
    if(this.generalInputRef) {
      this.addToTotalLimitGeneral()
    }
    this.uIs.toggleAddLimit(false)
    this.iEs.setLimitForCurrentMonth(this.totalLimit)
    this.iEs.limitForCurrentMonthChanged.next(this.totalLimit)
  }

  onShowCategories() {
    let confirm: any = false;
    if(this.totalLimit !== 0) {

      if(!this.categoriesVisible) {
        confirm = window.confirm('You will lose total amount. Do you want to switch to categories?')
      } else {
        confirm = window.confirm('You will lose total amount. Do you want to switch to overal amount?')
      }
      console.log(confirm == true)
      if(confirm) {
        this.totalLimit = 0
        this.categoriesVisible = !this.categoriesVisible
      }
    } else {
      this.categoriesVisible = !this.categoriesVisible

    }
  }

  showTooltip() {
    this.showAddCategoryTooltip = !this.showAddCategoryTooltip
  }
}
