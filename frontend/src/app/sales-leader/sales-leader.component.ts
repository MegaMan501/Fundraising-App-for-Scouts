import { Component, OnInit } from '@angular/core';
import { ChartType, ChartOptions, ChartDataSets } from 'chart.js';
import { Label } from 'ng2-charts';
import * as pluginDataLabels from 'chartjs-plugin-datalabels';


@Component({
  selector: 'app-sales-leader',
  templateUrl: './sales-leader.component.html',
  styleUrls: ['./sales-leader.component.scss']
})
export class SalesLeaderComponent implements OnInit {
  // pie chart components
  public pieChartOptions: ChartOptions = {
    responsive: true,
    legend: {
      position: 'right',
    },
    plugins: {
      datalabels: {
        formatter: (value, ctx) => {
          const label = ctx.chart.data.labels[ctx.dataIndex];
          return label;
        },
      },
    }
  };
  public pieChartLabels: Label[] = [['Oreo'], ['Chocolate Chip'], 'Thin Mint'];
  public pieChartData: number[] = [300, 500, 100];
  public pieChartType: ChartType = 'pie';
  public pieChartLegend = true;
  public pieChartPlugins = [pluginDataLabels];
  public pieChartColors = [
    {
      backgroundColor: ['rgba(0,153,102,0.85)', 'rgba(0,51,102,0.85)', 'rgba(255,255,102,0.85)'],
    },
  ];

  /*
  public barChartOptions: ChartOptions = {
    responsive: true,
    // We use these empty structures as placeholders for dynamic theming.
    scales: { xAxes: [{}], yAxes: [{}] },
    plugins: {
      datalabels: {
        anchor: 'end',
        align: 'end',
      }
    }
  };
  public barChartLabels: Label[] = ['Oreo', 'Chocolate Chip', 'Thin Mint', 'Smores'];
  public barChartType: ChartType = 'bar';
  public barChartLegend = true;
  public barChartPlugins = [pluginDataLabels];

  public barChartData: ChartDataSets[] = [
    { data: [300, 500, 100, 81], label: 'Total' },
    { data: [170, 190, 60, 45], label: 'Sold' }
  ];
  public barChartColors = [
    {
      backgroundColor: ['rgba(102,153,255,1)', 'rgba(153,102,102,1)'],
    },
  ];
  */

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
/*
  public randomize(): void {
    // Only Change 3 values
    const data = [
      Math.round(Math.random() * 100),
      59,
      80,
      (Math.random() * 100),
      56,
      (Math.random() * 100),
      40];
    this.barChartData[0].data = data;
  }
*/
  changeLabels() {
    const words = ['hen', 'variable', 'embryo', 'instal', 'pleasant', 'physical', 'bomber', 'army', 'add', 'film',
      'conductor', 'comfortable', 'flourish', 'establish', 'circumstance', 'chimney', 'crack', 'hall', 'energy',
      'treat', 'window', 'shareholder', 'division', 'disk', 'temptation', 'chord', 'left', 'hospital', 'beef',
      'patrol', 'satisfied', 'academy', 'acceptance', 'ivory', 'aquarium', 'building', 'store', 'replace', 'language',
      'redeem', 'honest', 'intention', 'silk', 'opera', 'sleep', 'innocent', 'ignore', 'suite', 'applaud', 'funny'];
    const randomWord = () => words[Math.trunc(Math.random() * words.length)];
    this.pieChartLabels = Array.apply(null, { length: 3 }).map(_ => randomWord());
  }

  addSlice() {
    this.pieChartLabels.push(['Line 1', 'Line 2', 'Line 3']);
    this.pieChartData.push(400);
    this.pieChartColors[0].backgroundColor.push('rgba(196,79,244,0.3)');
  }

  removeSlice() {
    this.pieChartLabels.pop();
    this.pieChartData.pop();
    this.pieChartColors[0].backgroundColor.pop();
  }

  changeLegendPosition() {
    this.pieChartOptions.legend.position = this.pieChartOptions.legend.position === 'left' ? 'top' : 'left';
  }

}
