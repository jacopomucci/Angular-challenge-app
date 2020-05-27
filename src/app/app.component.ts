import { Component } from "@angular/core";
import { ChartOptions } from "chart.js";
import { Subject } from "rxjs";

@Component({
  selector: "app-root",
  templateUrl: "./app.component.html",
  styleUrls: ["./app.component.css"],
})
export class AppComponent {
  inputData: any[] = null;
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
    this.inputData = [...dataObj];
    this.fields = this.getProperty(dataObj[0]);
  }

  onFieldSelected(event: { field: string; value: string }) {
    if (event.field === "fieldX") {
      this.selectedFields.fieldX = event.value;
    } else if (event.field === "fieldY") {
      this.selectedFields.fieldY = event.value;
    }
    console.log(this.selectedFields.fieldX);
    console.log(this.selectedFields.fieldY);
    if (this.selectedFields.fieldX && this.selectedFields.fieldY)
      this.updateCharts$.next();
  }
}
