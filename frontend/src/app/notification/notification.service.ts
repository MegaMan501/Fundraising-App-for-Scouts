// Angular
import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Router } from '@angular/router';

//Rxjs
import { Subject } from 'rxjs';
import { map } from 'rxjs/operators';

// Internal
import { environment as env } from '../../environments/environment';
import { Notification } from '../models/all.model';
import { Message } from '@angular/compiler/src/i18n/i18n_ast';

const BACKEND_URL = env.BACKEND_URL + 'notification';

@Injectable({
  providedIn: 'root'
})
export class NotificationService {

  private notifications: Notification[] = [];
  private notificationStatusListner = new Subject<Notification[]>();

  constructor(private http: HttpClient, private router: Router) { }

  getReturnedNotifications() { return this.notifications; }
  getAllNotificationsStatusListener() { return this.notificationStatusListner.asObservable(); }

  getNotifications()
  {
    this.http.get<{rows: any}>(BACKEND_URL + '/notifications').pipe(
      map((notificationData) => {
        return {
          notifications: notificationData.rows.map(n => {
            return {
              full_name: n.full_name,
              message: n.message,
            };
          }),
        };
      })
    )
    .subscribe(modData => {
      this.notifications = modData.notifications;
      this.notificationStatusListner.next([...this.notifications]);
    });

    return;
  }
}
