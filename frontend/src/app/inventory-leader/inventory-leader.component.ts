import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-inventory-leader',
  templateUrl: './inventory-leader.component.html',
  styleUrls: ['./inventory-leader.component.scss']
})
export class InventoryLeaderComponent implements OnInit {

  public chartType = 'bar';

  public chartDatasets: Array<any> = [
    { data: [300, 170, 95, 81, 140], label: 'Sold' },
    { data: [120, 70, 42, 64, 98], label: 'Unsold Inventory' },
  ];

  public chartLabels: Array<any> = ['Oreo', 'Thin Mints', 'Chocolate Chip', 'Smores', 'Crackers'];

    public chartColors: Array<any> = [
      {
        backgroundColor: [
          'rgba(0,51,102,0.8)',
          'rgba(0,51,102,0.8)',
          'rgba(0,51,102,0.8)',
          'rgba(0,51,102,0.8)',
          'rgba(0,51,102,0.8)'
        ],
        borderColor: [
          'rgba(0,51,102,1)',
          'rgba(0,51,102,1)',
          'rgba(0,51,102,1)',
          'rgba(0,51,102,1)',
          'rgba(0,51,102,1)'
        ],
        borderWidth: 2,
      },
      {
        backgroundColor: [
          'rgba(255,255,102,0.8)',
          'rgba(255,255,102,0.8)',
          'rgba(255,255,102,0.8)',
          'rgba(255,255,102,0.8)',
          'rgba(255,255,102,0.8)'
        ],
        borderColor: [
          'rgba(255,255,102,1)',
          'rgba(255,255,102,1)',
          'rgba(255,255,102,1)',
          'rgba(255,255,102,1)',
          'rgba(255,255,102,1)'
        ],
        borderWidth: 2,
      },
      ];

      public chartOptions: any = {
        responsive: true,
          scales: {
            xAxes: [{
              stacked: true
              }],
            yAxes: [
            {
              stacked: true
            }
          ]
        }
      };
      editField: string;
      personList: Array<any> = [
        { id: 1, name: 'Aurelia Vega', age: 30, companyName: 'Deepends', country: 'Spain', city: 'Madrid' },
        { id: 2, name: 'Guerra Cortez', age: 45, companyName: 'Insectus', country: 'USA', city: 'San Francisco' },
        { id: 3, name: 'Guadalupe House', age: 26, companyName: 'Isotronic', country: 'Germany', city: 'Frankfurt am Main' },
        { id: 4, name: 'Aurelia Vega', age: 30, companyName: 'Deepends', country: 'Spain', city: 'Madrid' },
        { id: 5, name: 'Elisa Gallagher', age: 31, companyName: 'Portica', country: 'United Kingdom', city: 'London' },
      ];

      awaitingPersonList: Array<any> = [
        { id: 6, name: 'George Vega', age: 28, companyName: 'Classical', country: 'Russia', city: 'Moscow' },
        { id: 7, name: 'Mike Low', age: 22, companyName: 'Lou', country: 'USA', city: 'Los Angeles' },
        { id: 8, name: 'John Derp', age: 36, companyName: 'Derping', country: 'USA', city: 'Chicago' },
        { id: 9, name: 'Anastasia John', age: 21, companyName: 'Ajo', country: 'Brazil', city: 'Rio' },
        { id: 10, name: 'John Maklowicz', age: 36, companyName: 'Mako', country: 'Poland', city: 'Bialystok' },
      ];

  constructor() { }

  ngOnInit(): void {
  }

  // events
  public chartClicked({ event, active }: { event: MouseEvent, active: {}[] }): void {
    console.log(event, active);
  }

  public chartHovered({ event, active }: { event: MouseEvent, active: {}[] }): void {
    console.log(event, active);
  }

  updateList(id: number, property: string, event: any) {
    const editField = event.target.textContent;
    this.personList[id][property] = editField;
  }

  remove(id: any) {
    this.awaitingPersonList.push(this.personList[id]);
    this.personList.splice(id, 1);
  }

  add() {
    if (this.awaitingPersonList.length > 0) {
      const person = this.awaitingPersonList[0];
      this.personList.push(person);
      this.awaitingPersonList.splice(0, 1);
    }
  }

  changeValue(id: number, property: string, event: any) {
    this.editField = event.target.textContent;
  }

}
