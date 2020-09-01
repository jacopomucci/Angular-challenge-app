import { Component } from "@angular/core";
import { ChartOptions } from "chart.js";
import { Subject } from "rxjs";

@Component({
  selector: "app-root",
  templateUrl: "./app.component.html",
  styleUrls: ["./app.component.css"],
})
export class AppComponent {
  data: any[];
  dataFields: string[] = [];
  selectedFields: [string, string];
  fieldY: string;

  step: number = 1;

  setData(data: any) {
    this.data = data;
    if (!data) return;
    this.dataFields = Object.getOwnPropertyNames(data[0]);
    this.selectedFields = [this.dataFields[0], this.dataFields[1]];
  }

  onFieldSelected(fields: [string, string]) {
    if (!fields) return;
    this.selectedFields = fields;
  }

  onNavigation(step: number) {
    this.step = step;
  }
}
