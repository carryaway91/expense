import { Component, EventEmitter, Input, OnDestroy, OnInit, Output } from "@angular/core";
import { UIService } from "src/app/services/ui.service";
import { Subscription } from 'rxjs'

@Component({
  selector: 'add-icome-dialog',
  templateUrl: './add-income-dialog.component.html',
  styleUrls: ['./add-income-dialog.component.scss']
})
export class AddIncomeDialogComponent implements OnInit, OnDestroy {
  dialogVisible: boolean = false;
  subs: Subscription[] = []


  constructor(private UiS: UIService) {}

  ngOnInit(): void {
    this.subs.push(this.UiS.incomeDialogVisibilityChanged.subscribe(val => {
      this.dialogVisible = val
    }))
  }

  ngOnDestroy(): void {
    this.subs.map(s => s.unsubscribe())
  }


  onCloseDialog() {
    this.UiS.toggleIncomeDalogVisible(false)
  }
}
