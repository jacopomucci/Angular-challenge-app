import { Component } from "@angular/core";
import { ChartOptions } from "chart.js";
import { Subject } from "rxjs";

@Component({
  selector: "app-root",
  templateUrl: "./app.component.html",
  styleUrls: ["./app.component.css"],
})
export class AppComponent {
  inputData = [];
  fields: string[] = [];
  selectedFields: {
    fieldX: string;
    fieldY: string;
  } = {
    fieldX: null,
    fieldY: null,
  };
  fieldY: string;

  updateCharts$ = new Subject<void>();

  getProperty(obj) {
    return Object.getOwnPropertyNames(obj);
  }
  setData(dataObj) {
    this.inputData = dataObj;
    this.fields = this.getProperty(dataObj[0]);
  }
  // setChartData() {
  //   const chartData = {
  //     labels: this.inputData.map((object) => {
  //       return object[this.selectedFields.fieldX];
  //     }),
  //     datasets: [
  //       {
  //         label: this.selectedFields.fieldY,
  //         data: this.inputData.map((object) => {
  //           return object[this.selectedFields.fieldY];
  //         }),
  //         backgroundColor: "#3252a8",
  //         hoverBackgroundColor: "#4d6cbf",
  //         borderColor: "#3252a8",
  //         pointBackgroundColor: "#3252a8",
  //         borderWidth: 3,
  //         fill: true,
  //       },
  //     ],
  //   };
  //   this.chartData = chartData;
  //   console.log(chartData);
  // }
  setFields(fields: [string, string]) {
    this.selectedFields.fieldX = fields[0];
    this.selectedFields.fieldY = fields[1];
    this.updateCharts$.next();
  }
}
