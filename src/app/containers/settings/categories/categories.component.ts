import { Component, ElementRef, OnDestroy, OnInit, ViewChild } from '@angular/core';
import { NgForm } from '@angular/forms';
import { Subscription } from 'rxjs';
import { TypesEnum } from 'src/app/enums/category';
import { Category } from 'src/app/models/category.model';
import { IncomeExportService } from 'src/app/services/incomeExpenseService.service';

@Component({
  selector: 'app-categories',
  templateUrl: './categories.component.html',
  styleUrls: ['./categories.component.scss']
})
export class CategoriesComponent implements OnInit, OnDestroy {
  categories: Category[] =[]
  subs: Subscription[] = []
  selected = TypesEnum.EXPENSE;
  @ViewChild('input') input: ElementRef;

  constructor(private iEs: IncomeExportService) {}


  ngOnInit() {
    this.categories = this.iEs.getCategories()
    this.subs.push(this.iEs.categoriesChanged.subscribe(val => {
      this.categories = val
    }))
  }
  ngOnDestroy() {
    this.subs.map(s => s.unsubscribe())
  }

  onRemoveCategory(id: string, name: string) {
    const confirm = window.confirm(`Do you want to remove "${name}" category?`)
    if(confirm) {
      this.iEs.removeCategory(id)
    }
  }

  onSubmit(form: NgForm) {
    const newCategory: Category = {
      id: Math.random() * 100000000000 + '',
      name: form.form.controls['name'].value,
      type_id: form.form.controls['type_id'].value,
    }
    this.iEs.addCategory(newCategory);
    this.input.nativeElement.value = ''
  }

}
