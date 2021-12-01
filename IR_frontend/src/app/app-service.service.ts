import { Injectable , EventEmitter} from '@angular/core';
import { HttpClient , HttpClientModule} from '@angular/common/http';
import { Observable, observable, of} from 'rxjs';
import { map } from 'rxjs/operators';



const baseUrl = 'http://192.168.1.122:9999/search'
const baseUrl2 = ''

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
        "poi": "",
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
      "poi": this.topicsTerm,
      "languages": this.languagesTerm
  }
    console.log(data)
    return this.http.post('http://192.168.1.122:9999/search', data);
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
      "poi": val,
      "languages": this.languagesTerm
  }
    console.log(data)
    return this.http.post('http://192.168.1.122:9999/search', data);
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
      "poi": this.topicsTerm,
      "languages": val
  }
    console.log(data)
    return this.http.post('http://192.168.1.122:9999/search', data);
  }

   analysisCountry(val:string){   //doughnut chart for countries vs number of tweets
    const data = {
      "queries": this.queryTerm,
      "countries": "",
      "poi": "",
      "languages": ""
  }
    console.log("inside server country")
    
    return this.http.post('http://192.168.1.122:9999/search/countries', data);
  }

  getOverviewAnanlysis(){
    return this.http.get(baseUrl2)
      .pipe(map(res => res));
  }
}
