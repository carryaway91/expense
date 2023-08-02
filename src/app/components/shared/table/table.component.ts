import { Component, Input } from '@angular/core';

@Component({
  selector: 'app-table',
  templateUrl: './table.component.html',
  styleUrls: ['./table.component.scss']
})
export class TableComponent {
  @Input() data: any;
  itemName: string;
  itemGeneral: string | number;

  ngOnInit(): void {
    this.itemName = this.data[0]
    this.itemGeneral = this.data[1]
  }
}
