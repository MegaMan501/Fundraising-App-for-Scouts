import { Component, OnInit, ViewChild, OnDestroy } from '@angular/core';
import { FormGroup, FormControl, Validators, FormGroupDirective } from '@angular/forms';
import { MatPaginator } from '@angular/material/paginator';
import { MatSort } from '@angular/material/sort';
import { Notification, Inventory, Group } from '../models/all.model';
import { MatTableDataSource } from '@angular/material/table';
import { Subscription } from 'rxjs';
import { NotificationService } from 'src/app/notification/notification.service';
import { MatDialog } from '@angular/material/dialog';
import { DialogDeleteComponent } from 'src/app/dialogs/delete/dialog-delete.component';
import { DialogEditInventoryComponent } from 'src/app/dialogs/edit-inventory/edit-inventory.component';
import { MatSnackBar } from '@angular/material/snack-bar';

@Component({
  selector: 'app-notifications-leader',
  templateUrl: './notifications-leader.component.html',
  styleUrls: ['./notifications-leader.component.scss']
})
export class NotificationsLeaderComponent implements OnInit {
  @ViewChild(MatPaginator) paginator: MatPaginator;
  @ViewChild(MatSort) sort: MatSort;

  isLoading = true;
  enable = 0;
  notificationForm: FormGroup;

  notifications: Notification[] = [];
  displayedColumns: string[] = ['receiverUserId', 'groupId', 'message', 'issueDate', 'expirationDate', 'action'];
  dataSource: MatTableDataSource<Notification>;
  notifSub: Subscription;

  constructor(
    private notificationService: NotificationService,
    public dialog: MatDialog,
    public snackbar: MatSnackBar
  ) {
    this.notificationForm = new FormGroup({
      message: new FormControl('', [Validators.required]),
      userId: new FormControl(),
      groupId: new FormControl(),
      date: new FormControl('', [Validators.required])
    });
   }

  ngOnInit(): void {
    this.notificationService.getSentNotifications();
    this.notifSub = this.notificationService
    .getSentNotificationsStatusListener()
    .subscribe(res => {
      this.notifications = res;
      this.dataSource = new MatTableDataSource<Notification>(this.notifications);
      this.dataSource.paginator = this.paginator;
      this.dataSource.sort = this.sort;
      this.isLoading = false;
    });
  }

  filter(value: string) {
    this.dataSource.filter = value.trim().toLowerCase();
  }

  onAddNotification(formDirective: FormGroupDirective) {

    let uId = formDirective.value.userId;
    let gId = formDirective.value.groupId;

    if(this.enable == 1){
      //individual messages
      gId = -1;
    }
    else if(this.enable == 2){
      //group messages
      uId = -1;
    }
    else if (this.enable == 3){
      gId = -1;
      uId = -1;
    }

    this.notificationService.addNotification(
      uId,
      gId,
      formDirective.value.message,
      formDirective.value.date.toISOString().slice(0, 19).replace('T', ' ')
    );

    formDirective.resetForm();
    this.notificationForm.reset();
  }

  onEdit(row){

  }

  onDelete(row){
    
  }

  onRefreshNotification(){
    this.notifSub.unsubscribe();
  }
}
