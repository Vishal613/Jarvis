import { Component, OnInit, Type } from '@angular/core';
import { AppServiceService } from 'src/app/app-service.service';
import { FormGroup, FormControl, Validators } from "@angular/forms";
import { Subject, throwError, of } from 'rxjs';
import { map, debounceTime, distinctUntilChanged, switchMap, catchError, retryWhen, retry } from "rxjs/operators";
import { Chart } from 'chart.js';
import { ChartOptions, ChartType, ChartDataSets , ChartLegendOptions} from 'chart.js';
import { Label , Color, MultiDataSet, SingleDataSet, monkeyPatchChartJsLegend, monkeyPatchChartJsTooltip} from 'ng2-charts';
import { ChartsModule } from 'ng2-charts/ng2-charts';

@Component({
  selector: 'app-homepage',
  templateUrl: './homepage.component.html',
  styleUrls: ['./homepage.component.scss'],
  
})
export class HomepageComponent implements OnInit {
  panelOpenState = false;
  loading: any;
  tweetsData:any;
  tweetsDataLength:any;
  searchTerm:any;
  countryData1:any;
  countryData2:any;
  hashtagData1:any;
  hashtagData2:any;
  doughnutChartLabels:any = [];
  doughnutChartData:any =[];
  doughnutChartType: ChartType = 'doughnut';
  doughnutChartColors: Color[] = [
      { backgroundColor: ['pink','yellow','brown']},
      { hoverBackgroundColor:['red','black','lightblue'] },]

  doughnutChartLabels_hashtag:any = [];
  doughnutChartData_hashtag:any = [];
  

  public pieChartOptions: ChartOptions = {
        responsive: true,};

  constructor(private appService: AppServiceService) {
    monkeyPatchChartJsTooltip();
    monkeyPatchChartJsLegend();
   }

  

  ngOnInit(): void {
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
            fontColor: "#fff", // this here
          },
      }],
      yAxes: [{
          
          gridLines: {
              display: true,
          },
          ticks: {
            fontColor: "#fff", // this here
          },
      }],
  }
};




lineChartOptions:any = {
  legend : {
    labels : {
      fontColor : '#ffffff'  
    }
},
}


 

  searchQuery(val:string){
      this.searchTerm = val;
      this.loading = true;
      this.appService.searchQuery(val)
      .subscribe({
        next:info => {
          this.loading = false;
          console.log("response +" ,info)
          

          this.tweetsData= info.response
          
          this.tweetsDataLength = this.tweetsData.length
      },
        
        error: error => console.log(console.error) 
      }
      );  
      this.analysisCountry();
  }

  searchCountryFilter(val:string){
    this.loading = true;
      this.appService.searchCountryFilter(val)
      .subscribe({
        next:info => {
          this.loading = false;
          this.tweetsData= info.response
           this.tweetsDataLength = this.tweetsData.length
      },
        
        error: error => console.log(console.error) 
      }
      );  
      this.analysisCountry();

  }
  searchTopicsFilter(val:string) {
    this.loading = true;
      this.appService.searchTopicsFilter(val)
      .subscribe({
        next:info => {
          this.loading = false;
          this.tweetsData= info.response
          
           this.tweetsDataLength = this.tweetsData.length
      },
        
        error: error => console.log(console.error) 
      }
      );  
      this.analysisCountry();
  }
  searchLanguageFilter(val:string){
    this.loading = true;
      this.appService.searchLanguageFilter(val)
      .subscribe({
        next:info => {
          this.loading = false;
          this.tweetsData= info.response
          
           this.tweetsDataLength = this.tweetsData.length
      },
        
        error: error => console.log(console.error) 
      }
      );  
      this.analysisCountry();
  }

  analysisCountry(){
    console.log("hi Country")
    this.appService.analysisCountry(this.searchTerm)
      .subscribe({
        next:info => {
          this.countryData1= info
          this.countryData2 = this.countryData1.response
          this.doughnutChartLabels = Object.keys(this.countryData2)
          this.doughnutChartData = Object.keys(this.countryData2).map(key => this.countryData2[key]);
          console.log("bye Country"+ this.doughnutChartData)
      },
        
        error: error => console.log(console.error) 
      }
      ); 
      this.tophashtags();
  }


  tophashtags(){
    console.log("hi Country")
    this.appService.tophashtags(this.searchTerm)
      .subscribe({
        next:info => {
          this.hashtagData1= info
          this.hashtagData2 = this.hashtagData1.response
          this.doughnutChartLabels_hashtag = Object.keys(this.hashtagData2)
          this.doughnutChartData_hashtag = Object.keys(this.hashtagData2).map(key => this.hashtagData2[key]);
          console.log("bye Country"+ this.hashtagData2)
      },
        
        error: error => console.log(console.error) 
      }
      ); 
  }

  // Bar Graph//////////////

   chart1=[65, 59, 80, 81, 56, 55, 40];
  

  public barChartLabels: Label[] = ['2006', '2007', '2008', '2009', '2010', '2011', '2012'];
  public barChartType: ChartType = 'bar';
  public barChartLegend = true;

  public barChartData: ChartDataSets[] = [
    { data: this.chart1, label: 'Series A' },
    // { data: [28, 48, 40, 19, 86, 27, 90], label: 'Series B' }
  ];

  public barChartColors: Color[] = [
    { backgroundColor: 'teal' },
    { backgroundColor: 'brown' },
  ]

  colors = ['red', 'green', 'blue', 'yellow', 'purple', 'teal'];

  

  
  public pieChartLabels: Label[] = [['Positive'], ['Neutral'], 'Negative'];
  public pieChartData: SingleDataSet = [30, 50, 20];
  public pieChartType: ChartType = 'pie';
  public pieChartLegend = true;
  public pieChartPlugins = [];

  


  




  
  // searchQuery(){
  //   this.appService.searchQuery()
  //     .subscribe(
  //       (response: any) => {
  //         console.log(response)
  //       },
  //       (error: any) => {
  //         console.log(error)
  //       });
  // }
}

