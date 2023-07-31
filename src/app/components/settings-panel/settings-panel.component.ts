import { Component } from '@angular/core';
import { UIService } from 'src/app/services/ui.service';
import { Subscription }from 'rxjs';


@Component({
  selector: 'app-settings-panel',
  templateUrl: './settings-panel.component.html',
  styleUrls: ['./settings-panel.component.scss']
})
export class SettingsPanelComponent {
  settingPanelVisible: boolean = false;
  subs: Subscription[] = [];

  constructor(private uIs: UIService) {}

  ngOnInit() {
    this.subs.push(this.uIs.settingsPanelVisibilityChanged.subscribe(val => {
      this.settingPanelVisible = val
    }))
  }

  onCloseSettingsPanel() {
    this.uIs.toggleSettingsPanel(false)
  }
}
