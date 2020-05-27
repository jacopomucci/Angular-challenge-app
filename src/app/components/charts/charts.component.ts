import {
  Component,
  OnInit,
  OnChanges,
  SimpleChanges,
  ViewChild,
  Input,
  OnDestroy,
} from "@angular/core";

import { BaseChartDirective, Label } from "ng2-charts";
import { ChartOptions, ChartDataSets } from "chart.js";
import { AppComponent } from "src/app/app.component";
import { Subscription } from "rxjs";

@Component({
  selector: "app-charts",
  templateUrl: "./charts.component.html",
  styleUrls: ["./charts.component.css"],
})
export class ChartsComponent implements OnInit, OnDestroy {
  @Input() data: any[] = [];
  @Input() fields: { fieldX: string; fieldY: string };
  @ViewChild(BaseChartDirective, { static: true }) chart: BaseChartDirective;

  sub: Subscription;

  chartOptions: ChartOptions = {
    legend: {
      display: false,
    },
  };

  chartLabels: Label[] = [];

  chartData: ChartDataSets[] = [
    {
      label: "Field X",
      data: [],
      backgroundColor: "#3252a8",
      hoverBackgroundColor: "#4d6cbf",
      hoverBorderColor: "#3252a8",
      borderColor: "#3252a8",
      pointBackgroundColor: "#3252a8",
      borderWidth: 3,
      fill: true,
    },
    {
      label: "Field Y",
      data: [],
      backgroundColor: "#34c9eb",
      hoverBackgroundColor: "#34c9eb",
      hoverBorderColor: "#34c9eb",
      borderColor: "#34c9eb",
      pointBackgroundColor: "#34c9eb",
      borderWidth: 3,
      fill: true,
    },
  ];

  constructor(private app: AppComponent) {}

  ngOnInit() {
    this.sub = this.app.updateCharts$.subscribe(() => {
      this.chartLabels = this.data.map((object) => {
        return object[this.fields.fieldX];
      });
      this.chartData[0].data = this.data.map((object) => {
        return object[this.fields.fieldX];
      });
      this.chartData[0].label = this.fields.fieldX;
      this.chartData[1].data = this.data.map((object) => {
        return object[this.fields.fieldY];
      });
      this.chartData[1].label = this.fields.fieldY;

      this.chart.update();
    });
  }

  ngOnDestroy() {
    this.sub.unsubscribe();
  }
}
