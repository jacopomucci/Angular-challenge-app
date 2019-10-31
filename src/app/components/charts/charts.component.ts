import { Component, OnInit, Input } from '@angular/core';
import { ChartDataSets } from 'chart.js';
import { Label } from 'ng2-charts';

@Component({
  selector: 'app-charts',
  templateUrl: './charts.component.html',
  styleUrls: ['./charts.component.css']
})
export class ChartsComponent implements OnInit {
  @Input() chartData;

  labels: Label[] = this.chartData.labels;
  datasets: ChartDataSets[] = this.chartData.datasets;

  constructor() {}

  ngOnInit() {
  }

}
