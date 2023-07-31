import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { OverviewGraphComponent } from './components/overviewGraph/overviewGraph.component';
import { HomepageComponent } from './containers/homepage.component';
import { GraphColumnComponent } from './components/overviewGraph/column/column.component';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { AddIncomeExpensesComponent } from './components/overviewGraph/addIncomeExpenses/addIncomeExpenses.component';
import { GraphGridComponent } from './components/graphGrid/graphGrid.component';
import { OverviewComponent } from './components/overview/overview.component';
import { CurrencyPipe } from './pipes/currencyPipe.pipe';
import { AddIconComponent } from './components/addIcon/add-icon.component';
import { AddIncomeDialogComponent } from './components/add-income/add-income-dialog.component';
import { LastFiveTransactionsComponent } from './components/last-five-transactions/last-five-transactions.component';
import { DetailPageComponent } from './containers/detail-page/detail-page.component';
import { TransactionDetailComponent } from './containers/transaction-detail/transaction-detail.component';
import { TransactionDetailItemComponent } from './components/transaction-detail-item/transaction-detail-item.component';
import { ShortenPipe } from './pipes/shorten.pipe';
import { ButtonComponent } from './components/shared/button/button.component';
import { NavigationComponent } from './components/navigation/navigation.component';
import { SpendingsDetailComponent } from './containers/spendings-detail/spendings-detail.component';
import { SettingsIconComponent } from './components/settings-icon/settings-icon.component';
import {MatSelectModule} from '@angular/material/select';
import { LimitComponent } from './containers/limit/limit.component';
import { HistoryOverviewComponent } from './containers/history-overview/history-overview.component';
import { OverallOverviewComponent } from './containers/overall-overview/overall-overview.component';
import { SettingsPanelComponent } from './components/settings-panel/settings-panel.component';
import { CategoriesComponent } from './containers/settings/categories/categories.component';
import { NgApexchartsModule } from 'ng-apexcharts';

@NgModule({
  declarations: [
    AppComponent,
    HomepageComponent,
    OverviewGraphComponent,
    GraphColumnComponent,
    AddIncomeExpensesComponent,
    GraphGridComponent,
    OverviewComponent,
    AddIconComponent,
    AddIncomeDialogComponent,
    CurrencyPipe,
    LastFiveTransactionsComponent,
    DetailPageComponent,
    TransactionDetailComponent,
    TransactionDetailItemComponent,
    ShortenPipe,
    ButtonComponent,
    NavigationComponent,
    SpendingsDetailComponent,
    SettingsIconComponent,
    LimitComponent,
    HistoryOverviewComponent,
    OverallOverviewComponent,
    SettingsPanelComponent,
    CategoriesComponent,
  ],
  imports: [
    NgApexchartsModule,
    BrowserModule,
    AppRoutingModule,
    FormsModule,
    MatSelectModule,
    BrowserAnimationsModule,
    ReactiveFormsModule,
  ],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule { }
