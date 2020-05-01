import { Component, OnInit, Input } from '@angular/core';
import * as Highcharts from 'highcharts';
import HC_exporting from 'highcharts/modules/exporting';


@Component({
  selector: 'app-card',
  templateUrl: './card.component.html',
  styleUrls: ['./card.component.scss']
})
export class CardComponent implements OnInit {


  @Input() label:string;
  @Input() total:string;
  @Input() percentage:string;


  constructor() { }

  charOptions: {};

  Highcharts = Highcharts;

  ngOnInit(): void {

    this.charOptions =  {
      chart: {
          type: 'area',
          backgroundColor:null,
          borderWidth: 0,
          margin: [2,2,2,2],
          height:60
      },
      title: {
          text: null
      },
      subtitle: {
          text: ''
      },
      xAxis: {
          labels: {
            enabled: false
          },
          title: {
            text:null
          },
          startOnTick: false,
          endOnTick: false,
          tickOptions:[]
      },
      yAxis: {
        labels: {
          enabled: false
        },
        title: {
          text:null
        },
        startOnTick: false,
        endOnTick: false,
        tickOptions:[]
    },
      tooltip: {
          split: true,
          valueSuffix: ' new scouts'
      },
      credits: {
          enabled: false
      },
      exporting: {
        enabled: false
      },
      series: [{
          name: 'Group 1',
          data: [71, 78, 39]
      }]
  };
    HC_exporting(Highcharts);

    setTimeout(() => {
      window.dispatchEvent(new Event('resize'))
    }, 300)
  }


}
