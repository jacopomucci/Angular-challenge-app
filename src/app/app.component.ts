import { Component } from '@angular/core';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})
export class AppComponent {

  inputData = [];
  fields = [];
  selectedX = '';
  selectedY = '';
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
      labels: this.inputData.map(object => {
         return object[this.selectedX]
      }),
      datasets: [{
        label: this.selectedY,
        data: this.inputData.map(object => {
            return object[this.selectedY]
        })
      }]
    }
    this.chartData = chartData;
    console.log(chartData);
  }
  setFields(fields) {
    this.selectedX = fields.x;
    this.selectedY = fields.y;
    setTimeout(() => this.setChartData(), 1000);
  }

}
