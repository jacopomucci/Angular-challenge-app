import { Component } from "@angular/core";

@Component({
  selector: "app-root",
  templateUrl: "./app.component.html",
  styleUrls: ["./app.component.css"],
})
export class AppComponent {
  inputData = [];
  fields = [];
  fieldX = "";
  fieldY = "";
  chartData = {};

  getProperty(obj) {
    return Object.getOwnPropertyNames(obj);
  }
  setData(dataObj) {
    this.inputData = dataObj;
    this.fields = this.getProperty(dataObj[0]);
  }
  setChartData() {
    const chartData = {
      labels: this.inputData.map((object) => {
        return object[this.fieldX];
      }),
      datasets: [
        {
          label: this.fieldY,
          data: this.inputData.map((object) => {
            return object[this.fieldY];
          }),
          backgroundColor: "rgba(75,192,192,0.4)",
          borderColor: "rgba(75,192,192,1)",
          pointBackgroundColor: "#fff",
          pointHitRadius: 10,
          pointBorderColor: "rgba(75,192,192,1)",
          borderWidth: 3,
          fill: true,
        },
      ],
    };
    this.chartData = chartData;
    console.log(chartData);
  }
  setFields(fields) {
    this.fieldX = fields.x;
    this.fieldY = fields.y;
    setTimeout(() => this.setChartData(), 1000);
  }
}
