import { Component, OnInit } from '@angular/core';
import { MatTableDataSource } from '@angular/material/table';


export interface memberData {
  name: string;
  position: number;
  groupID: number;
  revenue: number;
}

@Component({
  selector: 'app-members-leader',
  templateUrl: './members-leader.component.html',
  styleUrls: ['./members-leader.component.scss']
})

export class MembersLeaderComponent implements OnInit {

  constructor() { }
  groups = ['Group 1', 'Group2', 'Group3'];

  ngOnInit(): void {
  }

  members: memberData[] = [
    {position: 1, name: 'Sarah Corner', groupID: 1, revenue: 250},
    {position: 2, name: 'Colton Nicolas', groupID: 1, revenue: 350},
    {position: 3, name: 'Diane Nicolas', groupID: 1, revenue: 264},
    {position: 4, name: 'Christian Arthur', groupID: 1, revenue: 126},
    {position: 5, name: 'Geralt Rivia', groupID: 1, revenue: 345},
    {position: 6, name: 'Chris Hemsworth', groupID: 1, revenue: 218},
    {position: 7, name: 'Álvaro Morte', groupID: 1, revenue: 453},
    {position: 8, name: 'Úrsula Corberó', groupID: 1, revenue: 554},
    {position: 9, name: 'Itziar Itũno', groupID: 1, revenue: 150},
    {position: 10, name: 'Alba Flores', groupID: 1, revenue: 384}
  ];

  onSelect(event) {
    console.log("worked!");
    // this.selectGroup = event;
    // console.log(this.selectGroup);
  }

  nameButton() {
    console.log("it worked!");
  }

  displayedColumns: string[] = ['position', 'name', 'groupID', 'revenue'];
  displayedRows: string[] = ['total']
  dataSource = new MatTableDataSource(this.members);

  applyFilter(event: Event) {
    const filterValue = (event.target as HTMLInputElement).value;
    this.dataSource.filter = filterValue.trim().toLowerCase();
  }

 /** Gets the total cost of all transactions. */
  getTotalCost() {
    return this.members.map(t => t.revenue).reduce((acc, value) => acc + value, 0);
  }





}
