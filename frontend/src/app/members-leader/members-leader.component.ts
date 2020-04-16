import { Component, OnInit } from '@angular/core';
import { MatTableDataSource } from '@angular/material/table';
import { Chart } from 'chart.js';
import { FormControl, FormGroup, Validators, FormArray } from '@angular/forms';

import { MemberLeaderService } from '../memberServices/member-leader.service'
// import * as angular from 'angular';

// import { MatTableDataSource } from '@angular/material/table';


export interface memberData {
  name: string;
  id: number;
  groupID: number;
  revenue: number;
  email: string;
}

// var app = angular.module("myApp",[])

// app.controller('memberController',['$scope', function($scope){
//   $scope.addMember = function(){
//     $scope.members.push({
//         name: $scope.new_members.name,
//         email: $scope.new_members.email,
//         id: 1,
//         gropuID: 1,
//         revenue: 100
//     })
//   }
// }])




@Component({
  selector: 'app-members-leader',
  templateUrl: './members-leader.component.html',
  styleUrls: ['./members-leader.component.scss']
})


export class MembersLeaderComponent implements OnInit {

  memberForm: FormGroup;

  isLoading = false;


  constructor(public MemberLeaderService:MemberLeaderService) {
    this.memberForm = new FormGroup({
      name: new FormControl('', Validators.required),
      email: new FormControl('', [
        Validators.required,
        Validators.pattern("[^ @]*@[^ @]*")
      ]),
    })



   }

   public arr = []

  ngOnInit(): void {

      // this.MemberLeaderService.getUser().subscribe(data => this.arr = data)
      this.MemberLeaderService.getUser()
  };



  groups = ['Group 1', 'Group2', 'Group3'];
  members: memberData[] = [
    {id: 1, name: 'Sarah Corner', groupID: 1, email:'test@gmail.com',revenue: 250},
    {id: 2, name: 'Colton Nicolas', groupID: 1,email:'test@gmail.com', revenue: 350},
    {id: 3, name: 'Diane Nicolas', groupID: 1, email:'test@gmail.com', revenue: 264},
    {id: 4, name: 'Christian Arthur', groupID: 1, email:'test@gmail.com',revenue: 126},
    {id: 5, name: 'Geralt Rivia', groupID: 1, email:'test@gmail.com',revenue: 345},
    {id: 6, name: 'Chris Hemsworth', groupID: 1, email:'test@gmail.com',revenue: 218},
    {id: 7, name: 'Álvaro Morte', groupID: 1, email:'test@gmail.com',revenue: 453},
    {id: 8, name: 'Úrsula Corberó', groupID: 1, email:'test@gmail.com',revenue: 554},
    {id: 9, name: 'Itziar Itũno', groupID: 1, email:'test@gmail.com',revenue: 150},
    {id: 10, name: 'Alba Flores', groupID: 1, email:'test@gmail.com',revenue: 384}
  ];

  retreiveUser() {


   // this.members.push({
    //   id: 1,
    //   name: 'sdfsdf',
    //   groupID: 1,
    //   email: 'something@sth',
    //   revenue: 1000
    // });
    // let data = JSON.parse(this.MemberLeaderService.getUser());

    // this.members.push(data)
  }

  // get value from user input (form submit)
  logKeyValuePairs(group: FormGroup) {
    Object.keys(group.controls).forEach((key: string) => {

      let arr: any[]

      // Get a reference to the control using the FormGroup.get() method
      const abstractControl = group.get(key);

      // If the control is an instance of FormGroup i.e a nested FormGroup
      // then recursively call this same method (logKeyValuePairs) passing it
      // the FormGroup so we can get to the form controls in it
      if (abstractControl instanceof FormGroup) {
        this.logKeyValuePairs(abstractControl);
        // If the control is not a FormGroup then we know it's a FormControl
      }
      else {
       // console.log('Key = ' + key + ' && Value = ' + abstractControl.value);

        console.log(key)

        for(var i = 0; i < abstractControl.value; ++i)
        {
          console.log(i);
        }

        console.log(abstractControl.value)


        // this.MemberLeaderService.addUser(abstractControl.value, abstractControl.value)
        // for(var i = 0; i < arr.length; ++i) {
        //     console.log(arr[i]);
        // }
      }

    });
  }
  addMember = function() {
    // invalid input
    if(this.memberForm.invalid) {
      console.log("Invalid Input!")
    }
    // valid input
    if(this.memberForm.valid) {
      console.log("Form Submitted", this.memberForm.value)

      // get data from the user input
      this.logKeyValuePairs(this.memberForm);

      // reset user input after successfully submitted
      this.memberForm.reset();
    }

    // get user from database
    // this.MemberLeaderService.getUser();



    //console.log(this.members.length)

  };



  onSelect(event) {
    console.log("worked!");
    // this.selectGroup = event;
    // console.log(this.selectGroup);
  }


  displayedColumns: string[] = ['id', 'name', 'groupID', 'email','revenue', 'update','delete'];
  dataSource = new MatTableDataSource(this.members);

  applyFilter(event: Event) {
    const filterValue = (event.target as HTMLInputElement).value;
    this.dataSource.filter = filterValue.trim().toLowerCase();
  }

 /* Gets the total cost of all transactions. */
  getTotalCost() {
    return this.members.map(t => t.revenue).reduce((acc, value) => acc + value, 0);
  }

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
