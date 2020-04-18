import { Component, OnInit } from '@angular/core';
import { MatTableDataSource } from '@angular/material/table';
import { Chart } from 'chart.js';
import { FormControl, FormGroup, Validators, FormArray } from '@angular/forms';
import { MatSort } from '@angular/material/sort';
import { MemberLeaderService } from '../memberServices/member-leader.service'
import { DataSource } from '@angular/cdk/table';



export interface memberData {
  name: string;
  id: number;
  groupID: number;
  revenue: number;
  email: string;
}



@Component({
  selector: 'app-members-leader',
  templateUrl: './members-leader.component.html',
  styleUrls: ['./members-leader.component.scss']
})


export class MembersLeaderComponent implements OnInit {

  memberForm: FormGroup;
  public members = [];

   dataSource = new MatTableDataSource

  constructor(public MemberLeaderService:MemberLeaderService) {
    this.memberForm = new FormGroup({
      name: new FormControl('', Validators.required),
      email: new FormControl('', [
        Validators.required,
        Validators.pattern("[^ @]*@[^ @]*")
      ]),
    })

   }

  ngOnInit(): void {

      // this.MemberLeaderService.getUser().subscribe(data => this.arr = data)
      this.retreiveUser()

  };


/* function to get user from database */
  retreiveUser = function() {

    this.MemberLeaderService.getUser().subscribe(data =>{
      this.dataSource = data.rows
    })
  }



/* function to submit user input and save it into database */
  addMember = function() {
    // invalid input
    if(this.memberForm.invalid) {

      setTimeout(() => { alert("Input Invalid!"); }, 150);
    }
    // valid input
    if(this.memberForm.valid) {
      console.log("Form Submitted", this.memberForm.value)

    // confirm submit
    if (setTimeout(()=>confirm("Are you sure to all of the information is correct?"),150)) {
        setTimeout(()=> alert("You have successfully added a scout!") ,150);

      // get data from the user input and save into database
      this.MemberLeaderService.addUser(this.memberForm.value.name, this.memberForm.value.email)

      }



      // reset user input after successfully submitted
      this.memberForm.reset();

      // refresh table
      this.retreiveUser()
    }
  };



  onSelect(event) {
    console.log("worked!");
    // this.selectGroup = event;
    // console.log(this.selectGroup);
  }

  groups: string[] = ['Group 1', 'Group2', 'Group3'];



  // members = [
  //   {user_id: 1, full_name: 'Sarah Corner', group_id: 1, email:'test@gmail.com'},
  //   {user_id: 2, full_name: 'Colton Nicolas', group_id: 1,email:'test@gmail.com'},
  //   {user_id: 3, full_name: 'Diane Nicolas', group_id: 1, email:'test@gmail.com'},
  //   {user_id: 4, full_name: 'Christian Arthur', group_id: 1, email:'test@gmail.com'},
  //   {id: 5, name: 'Geralt Rivia', groupID: 1, email:'test@gmail.com'},
  //   {id: 6, name: 'Chris Hemsworth', groupID: 1, email:'test@gmail.com'},
  //   {id: 7, name: 'Álvaro Morte', groupID: 1, email:'test@gmail.com'},
  //   {id: 8, name: 'Úrsula Corberó', groupID: 1, email:'test@gmail.com'},
  //   {id: 9, name: 'Itziar Itũno', groupID: 1, email:'test@gmail.com'},
  //   {id: 10, name: 'Alba Flores', groupID: 1, email:'test@gmail.com'}
  // ];


  displayedColumns: string[] = ['user_id', 'full_name', 'email', 'update','delete'];
  //dataSource = new MatTableDataSource(this.members)




  applyFilter(event: Event) {
    const filterValue = (event.target as HTMLInputElement).value;
    // this.dataSource = new MatTableDataSource(this.members)
    // console.log(filterValue)
    this.dataSource.filter = filterValue.trim().toLowerCase();
  }

 /* Gets the total cost of all transactions. */
  // getTotalCost() {
  //   return this.members.map(t => t.revenue).reduce((acc, value) => acc + value, 0);
  // }

  /* Update user*/
  public redirectToUpdate = (id: string) => {

  }

  /* Delete user */
  public redirectToDelete = (id: string) => {

  }





  /* Chart */
  public chartType: string = 'bar';

  public chartDatasets: Array<any> = [
    { data: [65, 59, 80, 81, 56, 55, 40], label: 'Member Revenue' }
  ];

  public chartLabels: Array<any> = ['Sarah', 'Colton', 'Diane', 'Christian', 'Geralt', 'Chris'];

  public chartColors: Array<any> = [
    {
      backgroundColor: [
        'rgba(255, 99, 132, 0.2)',
        'rgba(54, 162, 235, 0.2)',
        'rgba(255, 206, 86, 0.2)',
        'rgba(75, 192, 192, 0.2)',
        'rgba(153, 102, 255, 0.2)',
        'rgba(255, 159, 64, 0.2)'
      ],
      borderColor: [
        'rgba(255,99,132,1)',
        'rgba(54, 162, 235, 1)',
        'rgba(255, 206, 86, 1)',
        'rgba(75, 192, 192, 1)',
        'rgba(153, 102, 255, 1)',
        'rgba(255, 159, 64, 1)'
      ],
      borderWidth: 2,
    }
  ];

  public chartOptions: any = {
    responsive: true
  };
  public chartClicked(e: any): void {

  }
  public chartHovered(e: any): void {

  }



}
