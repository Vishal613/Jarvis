import { AfterViewInit, Component, OnInit } from '@angular/core';
import { AppServiceService } from 'src/app/app-service.service';
import { Chart } from 'chart.js';
import { ChartDataSets, ChartType, RadialChartOptions } from 'chart.js';
import { Label, Color } from 'ng2-charts';
import { ChartOptions } from 'chart.js';
import { SingleDataSet, monkeyPatchChartJsLegend, monkeyPatchChartJsTooltip } from 'ng2-charts';
import * as Highcharts from 'highcharts';

@Component({
  selector: 'app-analytics',
  templateUrl: './analytics.component.html',
  styleUrls: ['./analytics.component.scss']
})
export class AnalyticsComponent implements AfterViewInit {

  constructor(private appService: AppServiceService) { }

  ngAfterViewInit(): void {
    this.createChartPie();
  }

  barChartOptions:any = {
    responsive: true,
    legend : {
        labels : {
          fontColor : '#ffffff'  
        }
    },
    scales: {
      xAxes: [{ 
          gridLines: {
              display: true,
          },
          ticks: {
            fontSize: 20,
            fontColor: "#fff", // this here
          },
      }],
      yAxes: [{
          
          gridLines: {
              display: true,
          },
          ticks: {
            fontSize: 15,
            fontColor: "#fff", // this here
          },
      }],
  }
};


  public radarChartOptions: RadialChartOptions = {
    responsive: true,
    legend : {
      labels : {
        fontSize: 20,
        fontColor : '#ffffff'  
      }
  },
  scale: {
    
    pointLabels:{
      fontSize: 15,
      fontColor:"white",
   },
}
  
  };
  public radarChartLabels: Label[] = ['AOC','AlejandroPoire','AmitShah','ArvindKejriwal','BernieSanders','CDCgov','Claudiashein','GOPLeader','HHSGov','HLGatell','JoeBiden','JohnKerry','KamalaHarris','Mike_Pence','MoHFW_INDIA','RahulGandhi','SSalud_mx','ShashiTharoor','alfredodelmazo','lopezobrador_','m_ebrard','narendramodi','nsitharaman'];

  public radarChartData: ChartDataSets[] = [
    { data: [829,344,680,904,1001,851,824,572,517,851,849,845,851,615,400,821,851,703,990,837,540,799,491], label: 'Number of tweets for each POI' }
  ];
  public radarChartType: ChartType = 'radar';







  // Pie Chart
  public pieChartOptions: ChartOptions = {
    responsive: true,
    legend : {
      labels : {
        fontColor : '#ffffff'  
      }
  },
  };
  public pieChartLabels: Label[] = ['India','Mexico','USA'];
  public pieChartData: SingleDataSet = [20876,23110,47887];
  public pieChartType: ChartType = 'pie';
  public pieChartLegend = true;
  public pieChartPlugins = [];


  private createChartPie(): void {
    let date = new Date();
    const data: any[] = [
      {"name":"India","y":20876},{"name":"Mexico","y":23110},{"name":"USA","y":47887}
    ];

    
     
  

    const chart = Highcharts.chart('chart-pie', {
      chart: {
        type: 'pie',
        backgroundColor:'transparent'
      },
      title: {
        text: '',
      },
      credits: {
        enabled: false,
      },
      tooltip: {
        headerFormat: `<span class="mb-2">Date: {point.key}</span><br>`,
        pointFormat: '<span>Amount: {point.y}</span>',
        useHTML: true,
      },
      series: [{
        name: null,
        innerSize: '50%',
        data,
      }],
    } as any);

   
  }



  //Doughnut Chart
  doughnutChartColors: Color[] = [
    { backgroundColor: ['#d63384','indigo','#e9ecef']},
    { hoverBackgroundColor:['red','black','lightblue'] },]
  doughnutChartLabels: Label[] = ['English','Espanol','Hindi'];
  doughnutChartData: SingleDataSet = [
    [46504,27308,18061]
  ];
  doughnutChartType: ChartType = 'doughnut';


//Bar Graph
chart1=[0.269,0.181,0.152,0.138,0.137,0.128,0.127,0.127,0.125,0.12];
  

  public barChartLabels: Label[] = ['vaccine','covid','narendramodi','covid19','vacunación','booster','people','लग','amp','करण'];
  public barChartType: ChartType = 'bar';
  public barChartLegend = true;

  public barChartData: ChartDataSets[] = [
    { data: this.chart1, label: 'Topic Importance' },
    // { data: [28, 48, 40, 19, 86, 27, 90], label: 'Series B' }
  ];

  public barChartColors: Color[] = [
    { backgroundColor: 'teal' },
    { backgroundColor: 'brown' },
  ]

  colors = ['red', 'green', 'blue', 'yellow', 'purple', 'teal'];
}