import { Component, OnInit, ViewChild, Input, OnDestroy } from "@angular/core";

import { BaseChartDirective, Label } from "ng2-charts";
import { ChartOptions, ChartDataSets } from "chart.js";
import { Subscription, combineLatest, BehaviorSubject } from "rxjs";
import { filter } from "rxjs/operators";

@Component({
  selector: "data-charts",
  templateUrl: "./charts.component.html",
  styleUrls: ["./charts.component.css"],
})
export class ChartsComponent implements OnInit, OnDestroy {
  @Input() set data(data: any) {
    this.data$.next(data);
  }
  @Input() set fields(fields: [string, string]) {
    this.fields$.next(fields);
  }
  @ViewChild(BaseChartDirective, { static: true }) chart: BaseChartDirective;

  data$ = new BehaviorSubject<any>(null);
  fields$ = new BehaviorSubject<[string, string]>(null);
  sub: Subscription;

  chartOptions: ChartOptions = {
    legend: {
      display: false,
    },
  };

  chartLabels: Label[] = [];

  chartData: ChartDataSets[] = [
    {
      data: [],
      backgroundColor: "rgba(50, 82, 168, 0.6)",
      hoverBackgroundColor: "#4d6cbf",
      hoverBorderColor: "#3252a8",
      borderColor: "#3252a8",
      pointBackgroundColor: "#3252a8",
      borderWidth: 3,
      fill: true,
    },
    {
      data: [],
      backgroundColor: "rgba(52, 201, 235, 0.6)",
      hoverBackgroundColor: "#34c9eb",
      hoverBorderColor: "#34c9eb",
      borderColor: "#34c9eb",
      pointBackgroundColor: "#34c9eb",

      borderWidth: 3,
      fill: true,
    },
  ];

  constructor() {}

  setChartData(data: any, fields: [string, string]) {
    const firstDataset = data.map((d: any) => d[fields[0]]);
    const secondDaset = data.map((d: any) => d[fields[1]]);

    this.chartLabels = firstDataset;
    this.chartData[0].data = firstDataset;
    this.chartData[1].data = secondDaset;
  }

  ngOnInit() {
    this.sub = combineLatest(this.data$, this.fields$)
      .pipe(filter(([data, fields]) => !!data && !!fields))
      .subscribe(([data, fields]) => this.setChartData(data, fields));
  }

  ngOnDestroy() {
    this.sub.unsubscribe();
  }
}
