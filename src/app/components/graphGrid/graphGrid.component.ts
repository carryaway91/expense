import { Component } from "@angular/core";
import { IncomeExportService } from "src/app/services/incomeExpenseService.service";

@Component({
  selector: 'graph-grid',
  templateUrl: './graphGrid.component.html',
  styleUrls: ['./graphGrid.component.scss']
})
export class GraphGridComponent {
  constructor(private iEs: IncomeExportService) {}
}
