import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { HomepageComponent } from './containers/homepage.component';
import { DetailPageComponent } from './containers/detail-page/detail-page.component';
import { TransactionDetailComponent } from './containers/transaction-detail/transaction-detail.component';
import { SpendingsDetailComponent } from './containers/spendings-detail/spendings-detail.component';
import { LimitComponent } from './containers/limit/limit.component';
import { HistoryOverviewComponent } from './containers/history-overview/history-overview.component';
import { OverallOverviewComponent } from './containers/overall-overview/overall-overview.component';
import { CategoriesComponent } from './containers/settings/categories/categories.component';

const routes: Routes = [
  {
    path: 'overview', component: HomepageComponent
  },
  {
    path: 'details/:month', component: DetailPageComponent
  },
  {
    path: 'details/transaction/:id', component: TransactionDetailComponent
  },
  {
    path: 'spendings/:month', component: SpendingsDetailComponent
  },
  {
    path: 'limit/:month', component: LimitComponent
  },
  {
    path: 'history', component: HistoryOverviewComponent
  },
  {
    path: 'overall', component: OverallOverviewComponent
  },
  {
    path: 'settings/categories', component: CategoriesComponent
  }

];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
