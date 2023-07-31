import { GraphColumn } from "../enums/graph-column";

export interface IncomeExpensesGraphModel {
  id: number;
  type: GraphColumn;
  amount: number;
  height: number;
}

export interface TypesModel {
  INCOME: 'income',
  EXPENSE: 'expense'
}


export interface IncomeExpensesModel {
  id: number;
  type: GraphColumn;
  amount: number;
  category_id: string;
  date: Date;
  note?: string;
}

export interface LimitModel {
  id: string;
  name: string;
  amount: number;
  month: string;
}
