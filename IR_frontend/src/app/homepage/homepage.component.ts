import { AfterViewInit, Component, OnInit, Type } from '@angular/core';
import { AppServiceService } from 'src/app/app-service.service';
import { FormGroup, FormControl, Validators } from "@angular/forms";
import { Subject, throwError, of } from 'rxjs';
import { map, debounceTime, distinctUntilChanged, switchMap, catchError, retryWhen, retry } from "rxjs/operators";
import { Chart } from 'chart.js';
import { ChartOptions, ChartType, ChartDataSets , ChartLegendOptions} from 'chart.js';
import { Label , Color, MultiDataSet, SingleDataSet, monkeyPatchChartJsLegend, monkeyPatchChartJsTooltip} from 'ng2-charts';
import { ChartsModule } from 'ng2-charts/ng2-charts';
import * as Highcharts from 'highcharts';
import { MatTabChangeEvent } from '@angular/material/tabs';
import { THIS_EXPR } from '@angular/compiler/src/output/output_ast';

declare var require: any;
  const Wordcloud = require('highcharts/modules/wordcloud');
  Wordcloud(Highcharts);

@Component({
  selector: 'app-homepage',
  templateUrl: './homepage.component.html',
  styleUrls: ['./homepage.component.scss'],
  
})
export class HomepageComponent implements OnInit {
  panelOpenState = false;
  loading: any;
  totalNum:any;
  tweetsData:any;
  tweetsDataLength:any;
  searchTerm:any;
  start:any = 0;
  previousDisabled = true;
  nextDisabled = false;
  countryData1:any;
  countryData2:any;
  hashtagData1:any;
  hashtagData2:any;
  wordcloudData1:any;
  wordcloudData2:any;
  negativeTweet:any;
  positiveTweet:any;
  saData1:any;
  saData2:any;
  stData1:any;
  stData2:any;
  barChartData:any =[];
  pieChartData:any =[];
  pieChartData1:any =[];
  weight:any;
  arr:any =[];
  flag:any = false;
  obj1 = {name:'', weight:0};

  doughnutChartLabels:any = [];
  doughnutChartData:any =[];
  doughnutChartType: ChartType = 'doughnut';
  doughnutChartColors: Color[] = [
      { backgroundColor: ['pink','yellow','brown']},
      { hoverBackgroundColor:['red','black','lightblue'] },]

  doughnutChartColors1: Color[] = [
      { backgroundColor: ['#d63384','cyan','brown','yellow','blue','red','black','green','purple','white','indigo',
                          'orange','lightblue','#d63384','cyan','brown','yellow','blue','red','black','green','pumpkin',
                          'skyblue','darkpink','tan','beige','#d63384','cyan','brown','yellow','blue','red','black','green','purple','white','indigo',
                          'orange','lightblue','#d63384','cyan','brown','yellow','blue','red','black','green','pumpkin',
                          'skyblue','darkpink','tan','beige']},
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
      fontColor : '#ffffff'  ,
      
    }
},
}


lineChartOptions1:any = {
  legend : {
    labels : {
      fontColor : '#ffffff'  ,
      fontSize: 15,
    }
},
}

lineChartOptions2:any = {
  legend : {
    labels : {
      fontColor : '#ffffff'  ,
      fontSize: 20,
    }
},
}
  

openTwitter(name:string, id:string){
  
    window.open("https://twitter.com/"+name+"/status/" +id +"/", '_blank')
}
  

  searchQuery(val:string,start:number){
      this.searchTerm = val;
      this.loading = true;
      this.start = start;
      console.log(this.start)
      console.log(this.previousDisabled)
      console.log(this.nextDisabled)
      if(this.start == 0){
        this.previousDisabled = true;
      }
      else{
        this.previousDisabled = false;
      }
      if(this.start == 180){
        this.nextDisabled = true;
      }
      else{
        this.nextDisabled = false;
      }
      this.appService.searchQuery(val,start)
      .subscribe({
        next:info => {
          this.totalNum = info.total_num
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
          this.totalNum = info.total_num
          this.tweetsData= info.response
           this.tweetsDataLength = this.tweetsData.length
           console.log("country-->" +this.tweetsData)
      },
        
        error: error => console.log(console.error) 
      }
      );  
      
      this.analysisCountry();

  }
  searchPoiFilter(val:string) {
    this.loading = true;
      this.appService.searchTopicsFilter(val)
      .subscribe({
        next:info => {
          this.totalNum = info.total_num
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
          this.totalNum = info.total_num
          this.tweetsData= info.response
          console.log("language-->" +this.tweetsData)
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
      },
        
        error: error => console.log(console.error) 
      }
      ); 
      this.tophashtags();
  }


  tophashtags(){
    
    this.appService.tophashtags(this.searchTerm)
      .subscribe({
        next:info => {
         
          this.hashtagData1= info
          this.hashtagData2 = this.hashtagData1.response
          this.doughnutChartLabels_hashtag = Object.keys(this.hashtagData2)
          this.doughnutChartData_hashtag = Object.keys(this.hashtagData2).map(key => this.hashtagData2[key]);
      },
        
        error: error => console.log(console.error) 
      }
      ); 
      this.wordcloud();
  }

  wordcloud(){
   
    this.appService.wordcloud(this.searchTerm)
    .subscribe({
      next:info => {
        
        this.wordcloudData1= info
        this.wordcloudData2 = this.wordcloudData1.response
        // this.weight = Object.keys(this.wordcloudData2).length;
        // console.log("word cloud data->" +this.wordcloudData2[0]["19"])
    },
      error: error => console.log(console.error) 
    }

    ); 
    console.log(this.flag)
    if (this.flag) {
      console.log("inside wordcloud")
      const chart = Highcharts.chart('wordcloud',{
        chart: {
          backgroundColor: 'transparent',
          
       },
        series: [{
          type: 'wordcloud',
          data:this.wordcloudData2,
          name: 'Occurrences',
      }],
      
      title: {
          text: 'Wordcloud of Topics',
          style: {
            color: 'transparent',
            font: 'bold 16px "Trebuchet MS", Verdana, sans-serif'
         }
      }
      }
  
    )
    }
    this.sentimentAnalysis();
  }
  sentimentAnalysis(){
   
    console.log("inside sa")
    this.appService.sentimentAnalysis(this.searchTerm)
      .subscribe({
        next:info => {
         
          this.saData1= info
          this.saData2 = this.saData1.response
          this.negativeTweet = this.saData1.negative_tweet
          this.positiveTweet = this.saData1.positive_tweet
          this.pieChartData = Object.keys(this.saData2).map(key => this.saData2[key]);
          console.log(this.pieChartData)
      },
        error: error => console.log(console.error) 
      }
      ); 
      this.searchTweetSentiment();
  }

  searchTweetSentiment(){
    
    this.appService.searchTweetSentiment(this.searchTerm)
    .subscribe({
      next:info => {
        this.loading = false;
        this.stData1= info
        this.stData2 = this.stData1.response
        this.pieChartData1 = Object.keys(this.stData2).map(key => this.stData2[key]);
        console.log(this.pieChartData1)
    },
      error: error => console.log(console.error) 
    }
    ); 
  }
  
  tabClick(event: MatTabChangeEvent) {
    console.log("inside analytiics")
    const tab = event.tab.textLabel;
    if (tab === 'Analytics') {
      this.flag = true;
      console.log("inside tab")
      const chart = Highcharts.chart('wordcloud',{
        chart: {
          backgroundColor: 'transparent',
          
       },
        series: [{
          type: 'wordcloud',
          data:this.wordcloudData2,
          name: 'Occurrences',
      }],
      
      title: {
          text: 'Wordcloud of Topics',
          style: {
            color: 'transparent',
            font: 'bold 16px "Trebuchet MS", Verdana, sans-serif'
         }
      }
      }
  
    )
    }
    else{
      this.flag=false;
    }
  }
  
  // Bar Graph//////////////

   
  

  
  public barChartType: ChartType = 'bar';
  public barChartLegend = true;
  public barChartLabels = ['Positive','Neutral','Negative']
  public barChartColors: Color[] = [
    { backgroundColor: 'teal' }
  ]



  

  
  public pieChartLabels: Label[] = ['Positive', 'Neutral', 'Negative'];
  public pieChartLabels1: Label[] = ['Negative', 'Neutral', 'Positive'];
  // public pieChartData: SingleDataSet = [30, 50, 20];
  public pieChartType: ChartType = 'pie';
  public pieChartLegend = true;
  public pieChartPlugins = [];
  public pieChartColors : Color[] =[{backgroundColor:['teal','indigo','pink']}]



  onButtonGroupClick($event:any){
    let clickedElement = $event.target || $event.srcElement;

    if( clickedElement.nodeName === "BUTTON" ) {

      let isCertainButtonAlreadyActive = clickedElement.parentElement.querySelector(".active");
      // if a Button already has Class: .active
      if( isCertainButtonAlreadyActive ) {
        isCertainButtonAlreadyActive.classList.remove("active");
      }

      clickedElement.className += " active";
    }

  }
}

