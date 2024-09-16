import { Routes } from '@angular/router';
import { AppComponent } from './app.component';
import { CircularChartComponent } from './circular-chart/circular-chart.component';
import { SchedulerComponent } from './scheduler/scheduler.component';

export const routes: Routes = [
    {
        path:'',
        component: AppComponent
    }, 
    {
        path:'charts',
        component: CircularChartComponent
    },
    {
        path:'scheduler',
        component: SchedulerComponent
    }
];
