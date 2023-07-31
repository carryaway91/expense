import { Component, EventEmitter, Output } from "@angular/core";

@Component({
  selector: 'add-icon',
  templateUrl: './add-icon.component.html',
  styleUrls: ['./add-icon.component.scss']
})
export class AddIconComponent {
  dialogVisible: boolean = false;
  @Output() emitDialogVisible = new EventEmitter<boolean>()

  onClick() {
    this.dialogVisible = true
    console.log('click')
    this.emitDialogVisible.emit(this.dialogVisible)
  }
}
