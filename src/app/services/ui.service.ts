import { Injectable } from "@angular/core";
import { Subject } from 'rxjs'

@Injectable({
  providedIn: 'root'
})
export class UIService {
  addIncomeDialogVisible: boolean = false;
  addLimitFormVisible: boolean = false;
  settingsPanelVisible: boolean = false;

  addLimitFormVisibilityChanged = new Subject<boolean>()
  incomeDialogVisibilityChanged = new Subject<boolean>()
  settingsPanelVisibilityChanged = new Subject<boolean>()


  toggleIncomeDalogVisible(val: boolean) {
    this.addIncomeDialogVisible = val
    this.incomeDialogVisibilityChanged.next(val)
  }

  toggleAddLimit(val: boolean) {
    this.addLimitFormVisible = val
    this.addLimitFormVisibilityChanged.next(val)
  }

  toggleSettingsPanel(val: boolean) {
    this.settingsPanelVisible = val;
    this.settingsPanelVisibilityChanged.next(val)
  }

}
