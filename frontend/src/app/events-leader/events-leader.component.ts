import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-events-leader',
  templateUrl: './events-leader.component.html',
  styleUrls: ['./events-leader.component.scss']
})
export class EventsLeaderComponent implements OnInit {

  constructor() { }

  groups = ['Group 1', 'Group2', 'Group3'];

  events = [
    {
        "event": "Participate Cookie Convention",
        "location": "Dallas",
        "date": "05/10/2020",
        "member": "Sarah Corner",
        "inventory": "choco pie",
        "desc": "something"
    },
]

  ngOnInit(): void {
  }


  onSelect(event) {

  }

}
