import { Component } from '@angular/core';
import { Chart3DModule, Chart3DAllModule, CircularChartDataLabel3DService, CircularChartLegend3DService, CircularChartTooltip3DService } from '@syncfusion/ej2-angular-charts'
import { CircularChart3DModule, PieSeries3DService } from '@syncfusion/ej2-angular-charts'

@Component({
  selector: 'app-circular-chart',
  standalone: true,
  imports: [Chart3DModule,
    Chart3DAllModule,
    CircularChart3DModule],

    providers: [PieSeries3DService, 
      CircularChartDataLabel3DService,
      CircularChartLegend3DService,
      CircularChartTooltip3DService],
  templateUrl: './circular-chart.component.html',
  styleUrl: './circular-chart.component.css'
})
export class CircularChartComponent {
  public tooltip: Object = {
    enable: true,
    format: '<b>${point.x}</b><br>Gold Medals: <b>${point.y}</b>'

  };

  public legendSettings: Object = {
    visible: true,
    position: 'Bottom'
  };
  public dataLabel: Object = {
    visible: true,
    position: 'Outside',
    name: 'country',
    connectorStyle: {
      length: '50px',
      width: 2
    }
  }
  public chartData = [
    { country: 'Canada', medals: 46 },
    { country: 'India', medals: 41 },
    { country: 'America', medals: 45 },
    { country: 'USA', medals: 32 },
    { country: 'Australia', medals: 21 },
    { country: 'Saudi', medals: 31 },
    { country: 'Germany', medals: 89 },
    { country: 'Russia', medals: 90 },
  ]

}
