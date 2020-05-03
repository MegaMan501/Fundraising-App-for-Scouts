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
import { Event } from '../../models/all.model';
import { EventService } from '../events.service';

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
  selector: 'app-events-scout',
  templateUrl: './events-scout.component.html',
  styleUrls: ['./events-scout.component.scss']
})
export class EventsScoutComponent implements OnInit, OnDestroy {
  @ViewChild('modalContent', { static: true }) modalContent: TemplateRef<any>;
  view: CalendarView = CalendarView.Month;
  CalendarView = CalendarView;
  viewDate: Date = new Date();
  activeDayIsOpen: boolean = false;
  modalData: { action: string; event: CalendarEvent; };
  actions: CalendarEventAction[] = [];
  refresh: Subject<any> = new Subject();
  events: CalendarEvent[] = [];
  evnts: Event[] = [];
  eventsSub: Subscription;

  constructor(
    private modal: NgbModal,
    private eventService: EventService
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
