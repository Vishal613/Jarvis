import { Component, OnInit } from '@angular/core';
import { AppServiceService } from 'src/app/app-service.service';

@Component({
  selector: 'app-search',
  templateUrl: './search.component.html',
  styleUrls: ['./search.component.scss']
})
export class SearchComponent implements OnInit {
  searchTerm:any;
  tweetsData:any;
  constructor(private appService: AppServiceService) { }

  ngOnInit(): void {
    // this.appService.$querySearchTerm
    // .subscribe((data)=>{
    //   this.searchTerm = JSON.stringify(data);
    //   this.appService.searchQuery(this.searchTerm)
    //   .subscribe({
    //     next:info => {this.tweetsData= JSON.stringify(info)
    //     console.log(this.tweetsData)
    //   },
        
    //     error: error => console.log(console.error) 
    //   }
    //   ); 
    // }
    // );
    
   

    // this.appService.searchQuery(this.searchTerm)
    //   .subscribe({
    //     next:info => {this.tweetsData= JSON.stringify(info)
    //     console.log(this.tweetsData)
    //   },
        
    //     error: error => console.log(console.error) 
    //   }
    //   );  
      
 
  }

}
