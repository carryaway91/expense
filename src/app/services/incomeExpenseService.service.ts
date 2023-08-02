import { Inject, Injectable } from "@angular/core";
import { data, allTransaction, categories, limit } from "../data/data";
import { IncomeExpensesGraphModel, IncomeExpensesModel, LimitModel } from "../models/incomeExpenses.model";
import { BehaviorSubject, Subject } from "rxjs";
import { Category } from "../models/category.model";
import { TypesEnum } from "../enums/category";
import { GraphColumn } from "../enums/graph-column";

@Injectable({
  providedIn: 'root'
})
export class IncomeExportService {
  public incomeTotal: number = 0;
  public expensesTotal: number = 0;
  @Inject('data') data: IncomeExpensesGraphModel[];
  public totalAmount: number;
  public totalExpenses: number;
  public lastFiveTransactions: IncomeExpensesModel[];
  public currentMonth: string;
  public selectedMonthString: string;
  public selectedMonth: number;
  public allTransactions: IncomeExpensesModel[] = []
  public mostCommonSpending: string | undefined;
  public mostSpendingOn: { mostSpentOnNumber: number, mostSpentOnString: string} = {
    mostSpentOnNumber: 0,
    mostSpentOnString: ''
  }
  public spendings: any[];
  public limitForCurrentMonth: number;
  categoriesList: Category[] = []

  incomeChanged = new BehaviorSubject<number>(this.incomeTotal)
  expensesChanged = new BehaviorSubject<number>(this.expensesTotal)
  addLastFiveTransactionsChanged = new Subject<IncomeExpensesModel[]>()
  allTransactionsChanged = new Subject<IncomeExpensesModel[]>()
  mostSpendingOnChanged = new Subject<any>()
  limitForCurrentMonthChanged = new Subject<number>()
  categoriesChanged = new Subject<Category[]>()
  getLimitForCurrentMonthChanged = new Subject<number>();
  spendings$ = new Subject<IncomeExpensesModel[]>()
  computedSpendings$ = new Subject()
  biggestSpending$ = new Subject<{ id: string; amount: number; name: string}>()

  constructor() {
    this.data = data
    this.allTransactions = allTransaction
    this.incomeTotal = this.data[0].amount
    this.expensesTotal = this.data[1].amount
    this.lastFiveTransactions = allTransaction.slice(0, 5)
    this.categoriesList = this.capitalize(categories);

    let date = new Date()
    this.currentMonth = new Intl.DateTimeFormat("en-US", { month: "long"}).format(date)
    this.setSpendings()
    this.getLimitForCurrentMonth()
  }

  capitalize(cat: Category[]): Category[] {
    let capitalized: Category[] = [];
    capitalized = cat.map(c => {
      c.name = c.name.slice(0, 1).toUpperCase() + c.name.slice(1, c.name.length).toLowerCase()
      return c
    })
    return capitalized
  }
  getLimitForCurrentMonth(): LimitModel | undefined {
    const lim = limit
    if(lim.month === this.currentMonth) {
      this.limitForCurrentMonth = limit.amount
      return lim
    }
    return
  }

  setLimitForCurrentMonth(amount: number) {
    this.limitForCurrentMonth = amount;
    this.limitForCurrentMonthChanged.next(amount)
  }
  getAllTransaction(): IncomeExpensesModel[] {
    return allTransaction
  }

  setMaxHight(idx: number, opositeIdx: number) {
    if(this.data[idx].amount > this.data[opositeIdx].amount) {
      this.data[idx].height = 100
      this.data[opositeIdx].height = this.data[opositeIdx].amount / this.data[idx].amount * 100
    } else if(this.data[idx].amount < this.data[opositeIdx].amount) {
      this.data[opositeIdx].height = 100
      this.data[idx].height = this.data[idx].amount / this.data[opositeIdx].amount * 100
    } else {
      this.data[opositeIdx].height = 100
      this.data[idx].height = 100
    }
  }

  getTotalLimit() {
    return this.limitForCurrentMonth
  }
  getCurrentMonth(): string {
    return this.currentMonth
  }

  setIncome(value: number) {
    this.incomeTotal = value
    this.incomeChanged.next(this.incomeTotal)
  }

  setExpenses(value: number) {
    this.expensesTotal = value
    this.expensesChanged.next(this.expensesTotal)
    console.log('all', this.allTransactions)
  }

  setSpendings() {
    this.spendings = this.allTransactions.filter(t => t.type === GraphColumn.EXPENSE)
    const spendingCategoriesIds = Array.from(new Set(this.spendings.map(s => s.category_id)))
    let first: any = []
    spendingCategoriesIds.forEach(() => {
      first.push(new Array)
    })
    spendingCategoriesIds.forEach(id => {

      spendingCategoriesIds.map((id, idx) => {
        this.spendings.map(s => {
          if(s.category_id === id) {
            first[idx].push(s)
          }
        })
      })
    })

    // vyfiltrujem duplikaty v oboch poliach
    first.forEach((_: any, idx: number) => {
      first[idx] = first[idx].filter((value: any, index: number, self: any) =>
      index === self.findIndex((t: any) => (
        t.place === value.place && t.id === value.id
        )))
      })
      let biggest = 0;
      let biggestArray: IncomeExpensesModel[] = [];
      first.forEach((array: any, idx: any) => {
        if(array.length > biggest) {
          console.log('ss')
          biggestArray = array
          biggest = idx
        }
      })
      let biggestSpendingAmount = this.spendings.sort((a, b) => b.amount - a.amount)
      let amounts: number[];
      amounts = biggestArray.map(v => v.amount)
      this.mostCommonSpending = categories.find(i => i.id === biggestArray[0].category_id)?.name
      let mostCommonSpendingTotal = amounts!.reduce((acc: number, curr: number) => acc + curr)

      // ak maju najcastejsie vydavky dokopy viac ako najvacsi vydavok celkovo
      if(+mostCommonSpendingTotal > +biggestSpendingAmount[0].amount) {
        this.mostSpendingOn.mostSpentOnNumber = mostCommonSpendingTotal
        let cat = categories.find(c => {
          if(c.id === biggestArray[0].category_id) {
            return c.name
          } else
          return undefined
        })
        this.mostSpendingOn.mostSpentOnString = cat!.name
        console.log(biggestSpendingAmount[0].amount)
      } else {
        this.mostSpendingOn.mostSpentOnNumber = biggestSpendingAmount[0].amount
        const cat = categories.find(c => c.id === biggestSpendingAmount[0].category_id)
        this.mostSpendingOn.mostSpentOnString = cat!.name
      }
      console.log(this.mostSpendingOn)
      this.mostSpendingOnChanged.next(this.mostSpendingOn);
    }


  addToAllTransactions(data: IncomeExpensesModel) {
    this.allTransactions.unshift(data)
    this.allTransactionsChanged.next(this.allTransactions);
    this.setSpendings()
    this.addLastFiveTransactionsChanged.next(this.allTransactions.slice(0, 5));
  }

  addToLastFive(data: IncomeExpensesModel) {
    this.lastFiveTransactions.pop()
    this.lastFiveTransactions.unshift(data)
    this.addLastFiveTransactionsChanged.next(this.lastFiveTransactions)
  }

  getSingleTransaction(id: number) {
    return this.allTransactions.find(t => t.id === id)
  }

  addCategory(category: Category) {
    const categoryNameCapitalized = category.name.slice(0, 1).toUpperCase() + category.name.slice(1, category.name.length).toLowerCase()
    const existingCategory = this.categoriesList.find(c => c.name === categoryNameCapitalized);
    if(!existingCategory) {
      this.categoriesList.push(category)
      this.categoriesChanged.next(this.categoriesList)
    } else {
      alert(`Category "${existingCategory.name}" already exists.`)
    }
   }

  removeCategory(id: string) {
    this.categoriesList = this.categoriesList.filter(c => c.id !== id)
    this.categoriesChanged.next(this.categoriesList)
  }

  getCategories() {
    return this.categoriesList;
  }

  getCategory(category_id: string) {
    return this.getCategories().find(c => c.id === category_id)!.name
  }

  getSpendings(): IncomeExpensesModel[] {
    const spendings = this.getAllTransaction().filter(i => i.type === GraphColumn.EXPENSE)
    this.spendings$.next(spendings)
    return spendings;
  }

  getComputedSpendings() {
    let computed: {id: string; name: string; amount: number}[] = [];
    computed = this.getCategories().filter(x => x.type_id === GraphColumn.EXPENSE).map(c => {
     return { id:c.id, name: c.name, amount: 0 }
    })
    this.getSpendings().map(s => {
      computed.map(item => {
        if(item.id === s.category_id) {
            item.amount += s.amount
        }
      })
    })
    this.computedSpendings$.next(computed);
    return computed;
  }

  getBiggestSpending() {
    const sorted = this.getComputedSpendings().sort((a, b) => b.amount - a.amount)
    this.biggestSpending$.next(sorted[0])
    return sorted[0]
  }
}
