import { Component } from '@angular/core';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})
export class AppComponent {

  data = [];
  fields = [];
  selectedX = '';
  selectedY = '';
  
  getProperty(obj) {
    return Object.getOwnPropertyNames(obj);
  }
  setData(dataObj) {
    this.data = dataObj;
    this.fields = this.getProperty(dataObj[0]);
  }
  setChart() {
    const chartData =  {
      labels: this.data.map(object => {
         return object[this.selectedX]
      }),
      datasets: [{
        label: this.selectedY,
        data: this.data.map(object => {
            return object[this.selectedY]
        }),
        backgroundColor: 'rgba(75,192,192,0.4)',
        borderColor: 'rgba(75,192,192,1)',
        pointBackgroundColor: '#fff',
        pointHitRadius: 10,
        pointBorderColor: 'rgba(75,192,192,1)',
        borderWidth: 3,
        fill: true
      }]
    }
    console.log(chartData);
  }
  setFields(fields) {
    this.selectedX = fields.x;
    this.selectedY = fields.y;
    console.log(this.selectedX);
    console.log(this.selectedY);

    setTimeout(() => this.setChart(), 1000);
  }

}
