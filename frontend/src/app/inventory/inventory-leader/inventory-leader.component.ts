import { Component, OnInit, ViewChild, OnDestroy } from '@angular/core';
import { InventoryService } from '../inventory.service';
import { FormGroup, FormControl, Validators, FormGroupDirective } from '@angular/forms';
import { MatPaginator } from '@angular/material/paginator';
import { MatSort } from '@angular/material/sort';
import { Inventory, Group } from '../../models/all.model';
import { MatTableDataSource } from '@angular/material/table';
import { Subscription } from 'rxjs';
import { MemberService } from 'src/app/members/member.service';
import { MatDialog } from '@angular/material/dialog';
import { DialogDeleteComponent } from 'src/app/dialogs/delete/dialog-delete.component';
import { DialogEditInventoryComponent } from 'src/app/dialogs/edit-inventory/edit-inventory.component';
import { MatSnackBar } from '@angular/material/snack-bar';

@Component({
  selector: 'app-inventory-leader',
  templateUrl: './inventory-leader.component.html',
  styleUrls: ['./inventory-leader.component.scss']
})
export class InventoryLeaderComponent implements OnInit, OnDestroy {
  @ViewChild(MatPaginator) paginator: MatPaginator;
  @ViewChild(MatSort) sort: MatSort;
  isLoading = true;
  displayedColumns: string[] = ['productId', 'groupId', 'name', 'cost', 'salePrice', 'weight', 'quantity', 'desc', 'action'];
  inventory: Inventory[] = [];
  groups: Group[] = [];
  inventoryForm: FormGroup;
  dataSource: MatTableDataSource<Inventory>;
  private inventorySub: Subscription;
  private groupSub: Subscription;

  constructor(
    private inventoryService: InventoryService,
    private memberService: MemberService,
    public dialog: MatDialog,
    public snackbar: MatSnackBar
  ) {
    this.inventoryForm = new FormGroup({
      name: new FormControl('', [Validators.required]),
      group: new FormControl('', Validators.required),
      cost: new FormControl('', Validators.required),
      salePrice: new FormControl('', [Validators.required]),
      weight: new FormControl('', Validators.required),
      quantity: new FormControl('', [
        Validators.required,
        Validators.pattern('^[0-9]*$')
      ]),
      desc: new FormControl('', Validators.maxLength(255))
    });
  }

  ngOnInit() {
    // Inventory Sub
    this.inventoryService.getInventory();
    this.inventorySub = this.inventoryService
    .getInventoryStatusListner()
    .subscribe(res => {
      this.inventory = res;
      this.dataSource = new MatTableDataSource<Inventory>(this.inventory);
      this.dataSource.paginator = this.paginator;
      this.dataSource.sort = this.sort;
      this.isLoading = false;
    });

    // Groups Sub
    this.memberService.getGroups();
    this.groupSub = this.memberService
    .getAllGroupStatusListener()
    .subscribe(res => {
      this.groups = res;
    });
  }

  onRefreshInventory() {
    this.isLoading = true;
    this.inventoryService.getInventory();
    this.isLoading = false;
  }

  onAddInventory(formDirective: FormGroupDirective) {
    if (this.inventoryForm.invalid) { return; }
    // console.log(this.inventoryForm.value);
    this.inventoryService.createInventory(
      this.inventoryForm.value.group,
      this.inventoryForm.value.name,
      this.inventoryForm.value.desc,
      this.inventoryForm.value.weight,
      this.inventoryForm.value.cost,
      this.inventoryForm.value.quantity,
      this.inventoryForm.value.salePrice
    );
    // add inventory to system
    formDirective.resetForm();
    this.inventoryForm.reset();
  }

  filter(value: string) {
    this.dataSource.filter = value.trim().toLowerCase();
  }

  onEdit(row) {
    // console.log(row);
    const dialogRef = this.dialog.open(DialogEditInventoryComponent, {
      data: {
        title: 'Are You Sure You Want to Edit this Product?',
        val: row,
        groups: this.groups
      },
      disableClose: true
    });

    dialogRef.afterClosed().subscribe(res => {
      if (res === false) {
        this.inventoryService.getInventory();
        return;
      }
      const data = {
        productId: row.productId,
        desc: res.val.desc,
        name: res.val.name,
        cost: res.val.cost,
        weight: res.val.weight,
        salePrice: res.val.salePrice,
        quantity: res.val.quantity,
        groupId: res.val.groupId
      };
      this.isLoading = true;
      this.inventoryService.updateInventory(data);
      this.isLoading = false;
    });
  }

  // Delete the product
  onDelete(row) {
    const dialogRef = this.dialog.open(DialogDeleteComponent, {
      data: {
        title: 'Are You Sure You Want to Delete this Product?',
        val: row
      },
      disableClose: true
    });

    dialogRef.afterClosed().subscribe(res => {
      if (res) {
        this.isLoading = true;
        this.inventoryService.deleteInventory(row.productId).subscribe(msg => {
          this.snackbar.open(msg.message.toString(), 'Okay', { duration: 5000 });
          this.inventoryService.getInventory();
          this.isLoading = false;
        });
      }
      return;
    });
  }

  ngOnDestroy() {
    this.inventorySub.unsubscribe();
    this.groupSub.unsubscribe();
  }
}
