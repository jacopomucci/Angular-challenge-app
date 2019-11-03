import { Component, OnInit, OnChanges, SimpleChanges, ViewChild, Input } from '@angular/core';
import { Color, BaseChartDirective, Label } from 'ng2-charts';
import { Chart } from 'chart.js';

@Component({
  selector: 'app-charts',
  templateUrl: './charts.component.html',
  styleUrls: ['./charts.component.css']
})
export class ChartsComponent implements OnInit, OnChanges {
  @Input() chartData;
  @ViewChild(BaseChartDirective, { static: true }) chart: BaseChartDirective;

  datasets = [];
  labels = [];
  colors = [];
  
  constructor() {}

  ngOnInit() {
    this.datasets = [{ data: [], label: '' }];
    this.labels = [];
  }

  ngOnChanges(changes: SimpleChanges) {
    this.datasets = this.chartData.datasets;
    this.labels = this.chartData.labels;
    this.chart.update();
  }
}
