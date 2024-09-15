import { Component } from '@angular/core';
import { RouterOutlet } from '@angular/router';
import { CircularChartComponent } from './circular-chart/circular-chart.component';


@Component({
  selector: 'app-root',
  standalone: true,
  imports: [RouterOutlet,CircularChartComponent],
  templateUrl: './app.component.html',
  styleUrl: './app.component.css'
})
export class AppComponent {
  title = 'syncfusion-practice';
}
