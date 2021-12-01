import { Component, OnInit } from '@angular/core';
import { AppServiceService } from 'src/app/app-service.service';
import { Chart } from 'chart.js';

@Component({
  selector: 'app-analytics',
  templateUrl: './analytics.component.html',
  styleUrls: ['./analytics.component.scss']
})
export class AnalyticsComponent implements OnInit {

  constructor(private appService: AppServiceService) { }

  ngOnInit(): void {
    this.appService.getOverviewAnanlysis()
      .subscribe(res => {
        console.log(res)
        // let var0 = res[].map(res => res.specific_var)
        // let var1 = res[].map(res => res.specific_var)
        // let var2 = res[].map(res => res.specific_var)
      })
  }

}
