import { Component,
  ChangeDetectionStrategy,
  ViewChild,
  TemplateRef,
  OnInit,
  OnDestroy,
} from '@angular/core';
import {
  startOfDay,
  endOfDay,
  subDays,
  addDays,
  endOfMonth,
  isSameDay,
  isSameMonth,
  addHours,
} from 'date-fns';
import { Subject, Subscription } from 'rxjs';
import { NgbModal } from '@ng-bootstrap/ng-bootstrap';
import {
  CalendarEvent,
  CalendarEventAction,
  CalendarEventTimesChangedEvent,
  CalendarView,
} from 'angular-calendar';
import { MatDialog } from '@angular/material/dialog';
import { DialogAddEventComponent } from '../../dialogs/add-event/add-event.component';
import { Event } from '../../models/all.model';
import { EventService } from '../events.service';
import { DialogDeleteComponent } from 'src/app/dialogs/delete/dialog-delete.component';
import { MatSnackBar } from '@angular/material/snack-bar';

const colors: any = {
  red: {
    primary: '#ad2121',
    secondary: '#FAE3E3',
  },
  blue: {
    primary: '#1e90ff',
    secondary: '#D1E8FF',
  },
  yellow: {
    primary: '#e3bc08',
    secondary: '#FDF1BA',
  },
};

@Component({
  selector: 'app-events-leader',
  templateUrl: './events-leader.component.html',
  styleUrls: ['./events-leader.component.scss']
})
export class EventsLeaderComponent implements OnInit, OnDestroy {
  @ViewChild('modalContent', { static: true }) modalContent: TemplateRef<any>;
  view: CalendarView = CalendarView.Month;
  CalendarView = CalendarView;
  viewDate: Date = new Date();
  activeDayIsOpen: boolean = false;
  modalData: { action: string; event: CalendarEvent; };
  actions: CalendarEventAction[] = [
    // {
    //   label: '<i class="fas fa-fw fa-pencil-alt"></i>',
    //   a11yLabel: 'Edit',
    //   onClick: ({ event }: { event: CalendarEvent }): void => {
    //     this.handleEvent('Edited', event);
    //   },
    // },
    {
      label: '<i class="fas fa-fw fa-trash-alt"></i>',
      a11yLabel: 'Delete',
      onClick: ({ event }: { event: CalendarEvent }): void => {
        // console.log("EVENT:",event);
        const dialogRef = this.dialog.open(DialogDeleteComponent, {
          data: {
            title: 'Are you sure you want to delete this dialog',
            val: { eventId: event.meta.id, eventTitle: event.title, eventStart: event.start, eventEnd: event.end}
          }
        });
        dialogRef.afterClosed().subscribe(res => {
          if (res) {
            this.eventService.deleteEvent(event.meta.id)
            .subscribe(results => {
              this.snackBar.open(results.message.toString(), 'Okay', { duration: 5000 });
            });
          }
          return;
        });
        this.events = this.events.filter((iEvent) => iEvent !== event);
        this.handleEvent('Deleted', event);
      },
    },
  ];
  refresh: Subject<any> = new Subject();
  events: CalendarEvent[] = [];
  evnts: Event[] = [];
  eventsSub: Subscription;

  constructor(
    private modal: NgbModal,
    private eventService: EventService,
    private dialog: MatDialog,
    public snackBar: MatSnackBar
  ) {}

  ngOnInit() {
    this.eventService.getEvents();
    this.eventsSub = this.eventService
    .getAllLeaderStatusListener()
    .subscribe(res => {
      this.evnts = res;
      this.events = [];
      this.evnts.forEach(e => {
        this.events.push({
            title: e.evnTitle,
            start: startOfDay(new Date(e.evnStartDate)),
            end: endOfDay(new Date(e.evnEndDate)),
            actions: this.actions,
            color: colors.blue,
            draggable: false,
            resizable: {
              beforeStart: false,
              afterEnd: false,
            },
            meta: {
              id: e.eventId,
            },
          });
      });
      this.refresh.next();
    });
  }

  dayClicked({ date, events }: { date: Date; events: CalendarEvent[] }): void {
    if (isSameMonth(date, this.viewDate)) {
      if (
        (isSameDay(this.viewDate, date) && this.activeDayIsOpen === true) ||
        events.length === 0
      ) {
        this.activeDayIsOpen = false;
      } else {
        this.activeDayIsOpen = true;
      }
      this.viewDate = date;
    }
  }

  eventTimesChanged({
    event,
    newStart,
    newEnd,
  }: CalendarEventTimesChangedEvent): void {
    this.events = this.events.map((iEvent) => {
      if (iEvent === event) {
        return {
          ...event,
          start: newStart,
          end: newEnd,
        };
      }
      return iEvent;
    });
    this.handleEvent('Dropped or resized', event);
  }

  handleEvent(action: string, event: CalendarEvent): void {
    this.modalData = { event, action };
    this.modal.open(this.modalContent, { size: 'lg' });
  }

  addEvent() {
    const dialogRef = this.dialog.open(DialogAddEventComponent, {
      data: {
        title: 'Add a New Event?'
      },
      disableClose: true
    });

    dialogRef.afterClosed().subscribe(res => {
      if (res) {
        res.evnStartDate = res.evnStartDate.toISOString().slice(0, 19).replace('T', ' ');
        res.evnEndDate = res.evnEndDate.toISOString().slice(0, 19).replace('T', ' ');
        this.eventService.createEvent(res);
      }
      return;
    });
  }

  deleteEvent(eventToDelete: CalendarEvent) {
    this.events = this.events.filter((event) => event !== eventToDelete);
  }

  setView(view: CalendarView) {
    this.view = view;
  }

  closeOpenMonthViewDay() {
    this.activeDayIsOpen = false;
  }

  ngOnDestroy() {
    this.eventsSub.unsubscribe();
  }
}
