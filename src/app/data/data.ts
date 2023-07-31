import { CategoryEnum } from "../enums/category";
import { GraphColumn } from "../enums/graph-column";
import { Category } from "../models/category.model";
import { IncomeExpensesGraphModel, IncomeExpensesModel, LimitModel } from "../models/incomeExpenses.model";

export let data: IncomeExpensesGraphModel[] = [{
  id: 1,
  type: GraphColumn.INCOME,
  amount: 0,
  height: 0
},
{
  id: 0,
  type: GraphColumn.EXPENSE,
  amount: 0,
  height: 0
}];

export const categories: Category[] = [
  {
    id: 'food_id',
    type_id: GraphColumn.EXPENSE,
    name: CategoryEnum.FOOD,
    source: 0
  },
  {
    id: 'clothing_id',
    type_id: GraphColumn.EXPENSE,
    name: CategoryEnum.CLOTHING,
    source: 0
  },
  {
    id: 'misc_id',
    type_id: GraphColumn.EXPENSE,
    name: CategoryEnum.MISC,
    source: 0
  },
  {
    id: 'salary_id',
    type_id: GraphColumn.INCOME,
    name: CategoryEnum.WORK,
    source: 1
  },
]

export const limit: LimitModel = {
  id: '2q2',
  name: '',
  amount: 0,
  month: new Intl.DateTimeFormat("en-US", { month: "long"}).format(new Date())
}


export const allTransaction: IncomeExpensesModel[] = [
  {
    id: 11111111,
    type: GraphColumn.INCOME,
    amount: 60000,
    category_id: categories[0].id,
    date: new Date(),
    note: 'Toto je moja prva vyplata z metransu velmi sa tesim kupim si strasne vela sladkosti'
  },
  {
    id: 34543543,
    type: GraphColumn.EXPENSE,
    amount: 10000,
    category_id: categories[2].id,
    date: new Date(),
  },
  {
    id: 856886856,
    type: GraphColumn.EXPENSE,
    amount: 10000,
    category_id: categories[1].id,
    date: new Date()

  },
  {
    id: 12132131,
    type: GraphColumn.EXPENSE,
    amount: 5000,
    category_id: categories[0].id,
    date: new Date()

  },
  {
    id: 32423424,
    type: GraphColumn.EXPENSE,
    amount: 10000,
    category_id: categories[0].id,
    date: new Date()

  },
  {
    id: 24332423,
    type: GraphColumn.EXPENSE,
    amount: 5000,
    category_id: categories[0].id,
    date: new Date()

  },
  {
    id: 4432432423,
    type: GraphColumn.EXPENSE,
    amount: 10000,
    category_id: categories[0].id,
    date: new Date()

  },
  {
    id: 32523433424,
    type: GraphColumn.EXPENSE,
    amount: 5000,
    category_id: categories[0].id,
    date: new Date()

  },
  {
    id: 53232525,
    type: GraphColumn.EXPENSE,
    amount: 10000,
    category_id: categories[1].id,
    date: new Date()

  },
  {
    id: 32423432,
    type: GraphColumn.EXPENSE,
    amount: 60000,
    category_id: categories[2].id,
    date: new Date()
  },
  {
    id: 67567,
    type: GraphColumn.EXPENSE,
    amount: 60000,
    category_id: categories[2].id,
    date: new Date()
  },
  {
    id: 12331,
    type: GraphColumn.EXPENSE,
    amount: 60000,
    category_id: categories[2].id,
    date: new Date()
  },
  {
    id: 8678678,
    type: GraphColumn.EXPENSE,
    amount: 60000,
    category_id: categories[2].id,
    date: new Date()
  },
  {
    id: 23423423,
    type: GraphColumn.EXPENSE,
    amount: 60000,
    category_id: categories[2].id,
    date: new Date()
  },
];

const incomeTotal = allTransaction.map(val => val.type === GraphColumn.INCOME ? val.amount : 0)
const expensesTotal = allTransaction.map(val => val.type === GraphColumn.EXPENSE ? val.amount : 0)
data[0].amount  = incomeTotal.reduce((acc, curr) => acc + curr, 0 )
data[1].amount  = expensesTotal.reduce((acc, curr) => acc + curr, 0 )
