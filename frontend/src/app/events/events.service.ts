// Angular
import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Router } from '@angular/router';
// Rxjs
import { Subject } from 'rxjs';
import { map } from 'rxjs/operators';
// Internal
import { Event } from '../models/all.model';
import { environment as env } from '../../environments/environment';
import { MatSnackBar } from '@angular/material/snack-bar';

const BACKEND_URL = env.BACKEND_URL + 'events';

@Injectable({providedIn: 'root'})
export class EventService {

  private events: Event[] = [];
  private allEventStatusListner = new Subject<Event[]>();

  constructor(
    private http: HttpClient,
    private router: Router,
    public snackBar: MatSnackBar
  ) {}

  getReturnedEvents() { return this.events; }
  getAllLeaderStatusListener() { return this.allEventStatusListner.asObservable(); }

  createEvent(data: any) {
    this.http.post<{rows: any}>
    (BACKEND_URL + '/add-event', data)
    .pipe(
      map((eventData) => {
        return {
          events: eventData.rows.map(e => {
            return {
              eventId: e.event_id,
              evnTitle: e.event_title,
              evnStartDate: e.start_date,
              evnEndDate: e.end_date,
              evnLoc: e.event_loc,
              evnDesc: e.event_desc,
            };
          }),
        };
      })
    ).subscribe(res => {
      // console.log(res);
      this.events = res.events;
      this.allEventStatusListner.next([...this.events]);
    }, err => {
      console.error(err);
    });
  }

  getEvents() {
    this.http.get<{rows: any}>(
        BACKEND_URL + '/all-events'
    ).pipe(
      map((eventData) => {
        return {
          events: eventData.rows.map(e => {
            return {
              eventId: e.event_id,
              evnTitle: e.event_title,
              evnStartDate: e.start_date,
              evnEndDate: e.end_date,
              evnLoc: e.event_loc,
              evnDesc: e.event_desc,
            };
          }),
        };
      })
    )
    .subscribe(res => {
      // console.log(res);
      this.events = res.events;
      this.allEventStatusListner.next([...this.events]);
    });
  }

   // delete a leader
   deleteEvent(eventId: number) {
    return this.http.delete<{message: string}>(BACKEND_URL + '/event/' + eventId);
  }

}
