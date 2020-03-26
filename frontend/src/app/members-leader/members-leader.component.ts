import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-members-leader',
  templateUrl: './members-leader.component.html',
  styleUrls: ['./members-leader.component.scss']
})
export class MembersLeaderComponent implements OnInit {

  constructor() { }
  groups = ['Group 1', 'Group2', 'Group3'];

  selectGroup:string = " ";
  available: boolean = false;
  name:string ="";

  members = [
    {
      "name": "Khang Tran",
      "revenue": 100,
      "cookies": "chocolate",
      "remain": 50,
      "something": "dsfasd",
    },

]


  ngOnInit(): void {
  }

  onSelect(event) {
    console.log("worked!");
    this.selectGroup = event;
    console.log(this.selectGroup);
  }

}
