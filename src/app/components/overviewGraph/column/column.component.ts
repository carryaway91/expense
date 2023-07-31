import { Component, Input, OnInit } from "@angular/core";
@Component({
  selector: 'app-graph-column',
  templateUrl: './column.component.html',
  styleUrls: ['./column.component.scss']
})
export class GraphColumnComponent implements OnInit  {
  @Input() amount: number;
  @Input() type: string;
  @Input() maxHeight: number;
  @Input() height: number;

  typing: string;
  calcHeight: number;

  ngOnInit(): void {
    this.typing = this.type;
    console.log(this.type)
  }

}
