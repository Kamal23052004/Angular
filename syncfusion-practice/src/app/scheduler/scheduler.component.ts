import { Component, ViewChild, ViewEncapsulation } from '@angular/core';
import { ScheduleComponent, ScheduleModule, ToolbarActionArgs } from '@syncfusion/ej2-angular-schedule'
import { ButtonModule } from '@syncfusion/ej2-angular-buttons'
import { createElement } from '@syncfusion/ej2-base';
import { ItemModel } from '@syncfusion/ej2-navigations';
import { DropDownList } from '@syncfusion/ej2-dropdowns';
import { DayService, WeekService, WorkWeekService, MonthService, AgendaService, MonthAgendaService } from '@syncfusion/ej2-angular-schedule'
import { EventSettingsModel, TimelineMonthService, TimelineYearService, GroupModel, DragAndDropService, ResizeService } from '@syncfusion/ej2-angular-schedule';


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
    TimelineMonthService, 
    TimelineYearService,
    DragAndDropService,
    ResizeService
  ],
  templateUrl: './scheduler.component.html',
  styleUrl: './scheduler.component.css',
  encapsulation: ViewEncapsulation.None
})
export class SchedulerComponent {




  @ViewChild('scheduleObj', { static: true })
  public scheduleObj?: ScheduleComponent;
  public selectedDate: Date = new Date(2018, 4, 1);
  public currentView: string = 'TimelineMonth';
  public group: GroupModel = { byGroupID: false, resources: ['Resources'] };
  public allowMultiple: boolean = true;
  public resourceDataSource: Object[] = this.generateResourceData(1, 300, 'Resource');
  public eventSettings: EventSettingsModel = { dataSource: this.generateStaticEvents(new Date(2018, 4, 1), 300, 12) , enableMaxHeight: false, enableIndicator: false };
  public virtualscroll: boolean = true;







  public viewOptions = [
    { text: 'Today', value: 'today' },
    { text: 'Week', value: 'Week' },
    { text: 'Month', value: 'TimelineMonth' },
    { text: 'Year', value: 'TimelineYear' },
  ];

  public onActionBegin(args: ToolbarActionArgs): void {
    if (args.requestType === 'toolbarItemRendering') {
      const dropdownEle = createElement('input', { id: 'viewSelector' });
      (args.items as ItemModel[]).push({
        align: 'Right',
        template: dropdownEle.outerHTML,
        cssClass: 'e-custom-dropdown',
      });
    }
  }


  public onActionComplete(args: any): void {
    if (args.requestType === 'toolBarItemRendered') {
      const dropdown = new DropDownList({
        dataSource: this.viewOptions,
        fields: { text: 'text', value: 'value' },
        placeholder: 'Select View',
        value: this.currentView,
        change: (e: any) => this.onViewChange(e),
      });
      dropdown.appendTo('#viewSelector');
    }
  }


  public onViewChange(event: any): void {
    const viewValue = event.itemData.value;
    if (viewValue === 'today') {
      this.scheduleObj!.selectedDate = new Date();
    } else {
      this.scheduleObj?.changeView(viewValue);
    }
  }






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
