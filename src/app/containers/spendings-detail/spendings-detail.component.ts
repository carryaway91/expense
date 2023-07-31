import { Component, OnDestroy, OnInit, ViewChild } from '@angular/core';
import { IncomeExpensesModel } from 'src/app/models/incomeExpenses.model';
import { IncomeExportService } from 'src/app/services/incomeExpenseService.service';
import { Subscription } from 'rxjs';
import {
  ApexNonAxisChartSeries,
  ApexResponsive,
  ApexChart,
  ChartComponent
} from "ng-apexcharts";

export type ChartOptions = {
  series: ApexNonAxisChartSeries;
  chart: ApexChart;
  responsive: ApexResponsive[];
  labels: any;
};


@Component({
  selector: 'app-spendings-detail',
  templateUrl: './spendings-detail.component.html',
  styleUrls: ['./spendings-detail.component.scss']
})
export class SpendingsDetailComponent implements OnInit , OnDestroy{
  @ViewChild("chart") chart: ChartComponent;
  public chartOptions: Partial<ChartOptions>;

  spendings: IncomeExpensesModel[] = [];
  subs: Subscription[] = []

  constructor(private iEs: IncomeExportService) {
    this.subs.push(this.iEs.spendings$.subscribe((s: IncomeExpensesModel[]) => {
      let labels = Array.from(new Set(s.map(s => s.category_id)))
      labels = labels.map(id => this.iEs.getCategory(id))
      console.log(labels)
      const series = Array.from(new Set(s.map(s => s.amount)))
      this.initChart(labels, series)
    }))
  }

  ngOnInit(): void {
    this.spendings = this.iEs.getSpendings()
  }

  ngOnDestroy(): void {
    this.subs.map(s => s.unsubscribe())
  }

  initChart(labels: string[], series: number[]): void {
    console.log(labels)
    this.chartOptions = {
      series,
      chart: {
        type: "pie",
        width: '120%'
      },
      labels,
      responsive: [
        {
          breakpoint: 480,
          options: {
            chart: {
            },
            legend: {
              position: "bottom"
            }
          }
        }
      ]
    };
  }
}
