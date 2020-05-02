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

const BACKEND_URL = env.BACKEND_URL + 'notification';

@Injectable({
  providedIn: 'root'
})
export class NotificationService {

  private notifications: Notification[] = [];
  private sentNotifications: Notification[] = [];
  private notificationStatusListner = new Subject<Notification[]>();
  private sentNotificationStatusListner = new Subject<Notification[]>();

  constructor(private http: HttpClient, private router: Router) { }

  getReturnedNotifications() { return this.notifications; }
  getReturnedSentNotifications() { return this.sentNotifications; }
  getAllNotificationsStatusListener() { return this.notificationStatusListner.asObservable(); }
  getSentNotificationsStatusListener() { return this.sentNotificationStatusListner.asObservable(); }

  getNotifications()
  {
    this.http.get<{rows: any}>(BACKEND_URL + '/notifications').pipe(
      map((notificationData) => {
        return {
          notifications: notificationData.rows.map(n => {
            return {
              name: n.full_name,
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

  getSentNotifications()
  {
    this.http.get<{rows: any}>(BACKEND_URL + '/sent-notifications').pipe(
      map((notificationData) => {
        return {
          notifications: notificationData.rows.map(n => {
            return {
              full_name: n.full_name,
              message: n.message,
              receiverUserId: n.receiver_user_id,
              groupId: n.group_id,
              issueDate: n.start_time,
              expirationDate: n.expiration
            };
          }),
        };
      })
    )
    .subscribe(modData => {
      this.sentNotifications = modData.notifications;
      this.sentNotificationStatusListner.next([...this.sentNotifications]);
    });

    return;
  }

  addNotification(
    userId: number,
    groupId: number,
    message: string,
    date: string
  ) {
    const data = { userId, groupId, message, date };

    return this.http.post<{rows: any}>(BACKEND_URL + '/notification', data)
      .pipe(
        map((notificationData) => {
          return {
            notifications: notificationData.rows.map(n => {
              return {
                full_name: n.full_name,
                message: n.message,
                receiverUserId: n.receiver_user_id,
                groupId: n.group_id,
                issueDate: n.start_time,
                expirationDate: n.expiration
              };
            })
          };
        })
      ).subscribe(res => {
        this.sentNotifications = res.notifications;
        this.sentNotificationStatusListner.next([...this.sentNotifications]);
      }, err => {
        console.log(err);
      });
  }
}
