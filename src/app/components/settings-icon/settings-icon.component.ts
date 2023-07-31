import { Component, EventEmitter } from '@angular/core';
import { UIService } from 'src/app/services/ui.service';

@Component({
  selector: 'app-settings-icon',
  templateUrl: './settings-icon.component.html',
  styleUrls: ['./settings-icon.component.scss']
})
export class SettingsIconComponent {

  constructor(private uIs: UIService) {}

  onOpenMenu() {
    this.uIs.toggleSettingsPanel(true)
  }
}
