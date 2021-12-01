import { Injectable , EventEmitter} from '@angular/core';
import { HttpClient , HttpClientModule} from '@angular/common/http';
import { Observable, observable, of} from 'rxjs';
import { map } from 'rxjs/operators';



const baseUrl = 'http://192.168.1.220:9999/search'
const baseUrl2 = 'http://192.168.1.220:9999/search/countries'
const baseUrl3 = 'http://192.168.1.220:9999/search/hashtags'

@Injectable({
  providedIn: 'root'
})
export class AppServiceService {

  queryTerm:any;
  countryTerm:any;
  topicsTerm:any;
  languagesTerm:any;
  $querySearchTerm =  new EventEmitter();

  constructor(private http: HttpClient) { }

  searchQuery(val:string): Observable<any>{
    this.queryTerm =  val;
      
      const data = {
        "queries": val,
        "countries": "",
        "poi_name": "",
        "languages": ""
    }
      console.log(data)
      this.$querySearchTerm.emit(val)
      return this.http.post(baseUrl, data);
  }

  searchCountryFilter(val:string): Observable<any>{
    this.countryTerm = val;

    if(!this.topicsTerm){
      this.topicsTerm="";
    }
    if(!this.languagesTerm){
      this.languagesTerm="";
    }

    const data = {
      "queries": this.queryTerm,
      "countries": val,
      "poi_name": this.topicsTerm,
      "languages": this.languagesTerm
  }
    console.log(data)
    return this.http.post(baseUrl, data);
  }

  searchTopicsFilter(val:string): Observable<any>{
    this.topicsTerm = val;

    if(!this.languagesTerm){
      this.languagesTerm="";
    }
    if(!this.countryTerm){
      this.countryTerm="";
    }

    const data = {
      "queries": this.queryTerm,
      "countries": this.countryTerm,
      "poi_name": val,
      "languages": this.languagesTerm
  }
    console.log(data)
    return this.http.post(baseUrl, data);
  }

  searchLanguageFilter(val:string): Observable<any>{
    this.languagesTerm = val;

    if(!this.topicsTerm){
      this.topicsTerm="";
    }
    if(!this.countryTerm){
      this.countryTerm="";
    }

    const data = {
      "queries": this.queryTerm,
      "countries": this.countryTerm,
      "poi_name": this.topicsTerm,
      "languages": val
  }
    console.log(data)
    return this.http.post(baseUrl, data);
  }

   analysisCountry(val:string){   //doughnut chart for countries vs number of tweets
    console.log("inside country server " + val)
    const data = {
      "queries": this.queryTerm,
      "countries": "",
      "poi": "",
      "languages": ""
  }
    console.log(data)
    
    return this.http.post(baseUrl2, data);
  }

  tophashtags(val:string){   //doughnut chart for countries vs number of tweets
    console.log("inside hashtag server " + val)
    const data = {
      "queries": this.queryTerm,
      "countries": "",
      "poi": "",
      "languages": ""
  }
    
    return this.http.post(baseUrl3, data);
  }

  getOverviewAnanlysis(){
    return this.http.get(baseUrl2)
      .pipe(map(res => res));
  }
}
