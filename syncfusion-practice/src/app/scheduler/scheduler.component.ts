import { Component, ViewChild, ViewEncapsulation } from '@angular/core';
import { ScheduleComponent, ScheduleModule } from '@syncfusion/ej2-angular-schedule'
import { ButtonModule } from '@syncfusion/ej2-angular-buttons'
import { DayService, WeekService, WorkWeekService, MonthService, AgendaService, MonthAgendaService } from '@syncfusion/ej2-angular-schedule'
import { EventSettingsModel, TimelineMonthService, TimelineYearService, GroupModel } from '@syncfusion/ej2-angular-schedule';


@Component({
  selector: 'app-scheduler',
  standalone: true,
  imports: [

    ScheduleModule,
    ButtonModule
  ],

  providers: [DayService,
    WeekService,
    WorkWeekService,
    MonthService,
    AgendaService,
    MonthAgendaService,
    TimelineMonthService, TimelineYearService],
  templateUrl: './scheduler.component.html',
  styleUrl: './scheduler.component.css',
  encapsulation: ViewEncapsulation.None
})
export class SchedulerComponent {
  // @ViewChild('scheduleObj') public scheduleObj!: ScheduleComponent;

  // public onDataBound(): void {
  //   // Set custom cell height and width after data is bound
  //   const workCells = this.scheduleObj.element.querySelectorAll('.e-work-cells') as NodeListOf<HTMLElement>;
  //   workCells.forEach((cell) => {
  //     cell.style.height = '1px';
  //     cell.style.width = '1px';
  //   });
  // }

  // public onDataBound(): void {
  //   const cells = document.querySelectorAll('.e-work-cells, .e-header-cells, .e-all-day-cells') as NodeListOf<HTMLElement>;
  //   cells.forEach((cell) => {
  //     cell.style.height = '1px'; // Adjust cell height here
  //     cell.style.width = '1px';  // Adjust cell width here
  //   });
  // }
  // public scheduleOptions: Object = {
  //   rowAutoHeight: false
  // };

  @ViewChild('scheduleObj') public scheduleObj!: ScheduleComponent;

  // public eventSettings: Object = {
  //   enableMaxHeight: false,  // Ensure all events are shown without height restriction
  //   enableIndicator: false   // Disable the "+1 more" indicator
  // };

  // Event triggered after the data is loaded and Scheduler is rendered
  public onDataBound(): void {
    // Get all the work cells and adjust their size
    const cells = this.scheduleObj.element.querySelectorAll('.e-work-cells, .e-header-cells, .e-all-day-cells') as NodeListOf<HTMLElement>;
    const resourceCells = this.scheduleObj.element.querySelectorAll('.e-resource-cells') as NodeListOf<HTMLElement>;
    const resourceColumnWrap = this.scheduleObj.element.querySelector('.e-resource-column-wrap') as HTMLElement;

    cells.forEach(cell => {
      cell.style.height = '30px';  // Set your desired height
      cell.style.width = '30px';   // Set your desired width
    });

    resourceCells.forEach(resourceCell => {
      resourceCell.style.height = '30px';  // Set the resource cell height
      resourceCell.style.width = '100px';  // Set a wider width for the resource cells
    });

    // Adjust the resource column wrapper to avoid it from collapsing
    if (resourceColumnWrap) {
      resourceColumnWrap.style.width = '100px';  // Set a wider width for the entire resource column
      resourceColumnWrap.style.minWidth = '100px'; 
    }

    
  }

  public selectedDate: Date = new Date(2018, 4, 1);
  public group: GroupModel = { byGroupID: false, resources: ['Resources'] };
  public allowMultiple: boolean = true;
  public resourceDataSource: Object[] = this.generateResourceData(1, 300, 'Resource');
  public eventSettings: EventSettingsModel = { dataSource: this.generateStaticEvents(new Date(2018, 4, 1), 300, 12) , enableMaxHeight: false, enableIndicator: false };
  public virtualscroll: boolean = true;
  private generateStaticEvents(start: Date, resCount: number, overlapCount: number): Object[] {
    let data: Object[] = [];
    let id: number = 1;
    for (let i: number = 0; i < resCount; i++) {
      let randomCollection: number[] = [];
      let random: number = 0;
      for (let j: number = 0; j < overlapCount; j++) {
        random = Math.floor(Math.random() * (30));
        random = (random === 0) ? 1 : random;
        if (randomCollection.indexOf(random) !== -1 || randomCollection.indexOf(random + 2) !== -1 ||
          randomCollection.indexOf(random - 2) !== -1) {
          random += (Math.max.apply(null, randomCollection) + 10);
        }
        for (let k: number = 1; k <= 2; k++) {
          randomCollection.push(random + k);
        }
        let startDate: Date = new Date(start.getFullYear(), start.getMonth(), random);
        startDate = new Date(startDate.getTime() + (((random % 10) * 10) * (1000 * 60)));
        let endDate: Date = new Date(startDate.getTime() + ((1440 + 30) * (1000 * 60)));
        data.push({
          Id: id,
          Subject: 'Event #' + id,
          StartTime: startDate,
          EndTime: endDate,
          IsAllDay: (id % 10) ? false : true,
          ResourceId: i + 1
        });
        id++;
      }
    }
    return data;
  };
  private generateResourceData(startId: number, endId: number, text: string): Object[] {
    let data: { [key: string]: Object }[] = [];
    let colors: string[] = [
      '#ff8787', '#9775fa', '#748ffc', '#3bc9db', '#69db7c',
      '#fdd835', '#748ffc', '#9775fa', '#df5286', '#7fa900',
      '#fec200', '#5978ee', '#00bdae', '#ea80fc'
    ];
    for (let a: number = startId; a <= endId; a++) {
      let n: number = Math.floor(Math.random() * colors.length);
      data.push({
        Id: a,
        Text: text + ' ' + a,
        Color: colors[n]
      });
    }
    return data;
  }

}
