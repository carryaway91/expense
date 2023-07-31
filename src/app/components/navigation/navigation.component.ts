import { Component, Output, EventEmitter } from '@angular/core';
import {  Router } from '@angular/router';
import { IncomeExportService } from 'src/app/services/incomeExpenseService.service';
import { UIService } from 'src/app/services/ui.service';

@Component({
  selector: 'app-navigation',
  templateUrl: './navigation.component.html',
  styleUrls: ['./navigation.component.scss']
})
export class NavigationComponent {
  @Output() dialogVisible = new EventEmitter()
  currentMonth: string;

  constructor(private iEs: IncomeExportService, private UiS: UIService, private router: Router) {}

  ngOnInit(): void {
    this.currentMonth = this.iEs.getCurrentMonth()
  }
  onDialogVisible() {
    this.router.navigate(['/overview']);
    setTimeout(() => {
      this.UiS.toggleIncomeDalogVisible(true)
    },1)
  }
}
