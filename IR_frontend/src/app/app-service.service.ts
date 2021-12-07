import { Injectable , EventEmitter} from '@angular/core';
import { HttpClient , HttpClientModule} from '@angular/common/http';
import { Observable, observable, of} from 'rxjs';
import { map } from 'rxjs/operators';

const baseUrl = 'http://192.168.1.122:9999/search'
const baseUrl2 = 'http://192.168.1.122:9999/search/countries'
const baseUrl3 = 'http://192.168.1.122:9999/search/hashtags'
const baseUrl4 = 'http://192.168.1.122:9999/topics'
const baseUrl5 = 'http://192.168.1.122:9999/search/replies/sentiment'
const baseUrl6 = 'http://192.168.1.122:9999/search/sentiment'
const baseUrl7 = 'http://192.168.1.122:9999/voice'

@Injectable({
  providedIn: 'root'
})
export class AppServiceService {

  queryTerm:any;
  countryTerm:any;
  topicsTerm:any;
  languagesTerm:any;
  start:any;
  add_filter:boolean = false;
  filter:any;
  $querySearchTerm =  new EventEmitter();

  constructor(private http: HttpClient) { }

  searchQuery(val:string, start:number): Observable<any>{
    this.queryTerm =  val;
    this.start = start;
    if(!this.topicsTerm){
      this.topicsTerm=null;
    }
    if(!this.countryTerm){
      this.countryTerm=null;
    }
    if(!this.languagesTerm){
      this.languagesTerm=null;
    }
    if(this.add_filter){
      this.filter = ["dis_info"]
    }
    else{
      this.filter = null;
    }

      const data = {
        "query": val,
        "country": this.countryTerm,
        "poi_name": this.topicsTerm,
        "language": this.languagesTerm,
        "start":start,
        "rows":20,
        "additional_filters":this.filter
    }
      this.$querySearchTerm.emit(val)
      return this.http.post(baseUrl, data);
  }

  sentimentAnalysis(val:string): Observable<any>{
    console.log("inside sentiment server")
    if(!this.topicsTerm){
      this.topicsTerm=null;
    }
    if(!this.countryTerm){
      this.countryTerm=null;
    }
    if(!this.languagesTerm){
      this.languagesTerm=null;
    }
    if(this.add_filter){
      this.filter = ["dis_info"]
    }
    else{
      this.filter = null;
    }
    const data = {
      "query": this.queryTerm,
      "country": this.countryTerm,
      "poi_name": this.topicsTerm,
      "language": this.languagesTerm,
      "start":this.start,
      "rows":20,
      "additional_filters":this.filter
      
  }
  return this.http.post(baseUrl5, data);
  }

  searchCountryFilter(val:string): Observable<any>{
    this.countryTerm = val;

    if(!this.topicsTerm){
      this.topicsTerm=null;
    }
    if(!this.languagesTerm){
      this.languagesTerm=null;
    }
    if(this.add_filter){
      this.filter = ["dis_info"]
    }
    else{
      this.filter = null;
    }

    const data = {
      "query": this.queryTerm,
      "country": val,
      "poi_name": this.topicsTerm,
      "language": this.languagesTerm,
      "start":this.start,
      "rows":20,
      "additional_filters":this.filter
  }
    return this.http.post(baseUrl, data);
  }

  searchTopicsFilter(val:string): Observable<any>{
    this.topicsTerm = val;

    if(!this.languagesTerm){
      this.languagesTerm=null;
    }
    if(!this.countryTerm){
      this.countryTerm=null;
    }
    if(this.add_filter){
      this.filter = ["dis_info"]
    }
    else{
      this.filter = null;
    }

    const data = {
      "query": this.queryTerm,
      "country": this.countryTerm,
      "poi_name": val,
      "language": this.languagesTerm,
      "start":this.start,
      "rows":20,
      "additional_filters":this.filter
  }
    return this.http.post(baseUrl, data);
  }

  searchLanguageFilter(val:string): Observable<any>{
    this.languagesTerm = val;

    if(!this.topicsTerm){
      this.topicsTerm=null;
    }
    if(!this.countryTerm){
      this.countryTerm=null;
    }
    if(this.add_filter){
      this.filter = ["dis_info"]
    }
    else{
      this.filter = null;
    }

    const data = {
      "query": this.queryTerm,
      "country": this.countryTerm,
      "poi_name": this.topicsTerm,
      "language": val,
      "start":this.start,
      "rows":20,
      "additional_filters":this.filter
  }
    return this.http.post(baseUrl, data);
  }

  additional_filter(filter:boolean): Observable<any>{
    this.add_filter = filter;
    if(!this.topicsTerm){
      this.topicsTerm=null;
    }
    if(!this.countryTerm){
      this.countryTerm=null;
    }
    if(!this.languagesTerm){
      this.languagesTerm=null;
    }
    if(this.add_filter){
      this.filter = ["dis_info"]
    }
    else{
      this.filter = null;
    }
    const data = {
      "query": this.queryTerm,
      "country": this.countryTerm,
      "poi_name": this.topicsTerm,
      "language": this.languagesTerm,
      "start":this.start,
      "rows":20,
      "additional_filters":this.filter
  }

  console.log("country server data for chart data")
  console.log(data)
    return this.http.post(baseUrl, data);
    
  }

   analysisCountry(val:string){   //doughnut chart for countries vs number of tweets
    if(!this.topicsTerm){
      this.topicsTerm=null;
    }
    if(!this.countryTerm){
      this.countryTerm=null;
    }
    if(!this.languagesTerm){
      this.languagesTerm=null;
    }
    if(this.add_filter){
      this.filter = ["dis_info"]
    }
    else{
      this.filter = null;
    }
    
    const data = {
      "query": this.queryTerm,
      "country": this.countryTerm,
      "poi_name": this.topicsTerm,
      "language": this.languagesTerm,
      "start":0,
      "rows":20,
      "additional_filters":this.filter
  }

  console.log("country server data for chart data")
  console.log(data)
    return this.http.post(baseUrl2, data);
  }

  tophashtags(val:string){   //doughnut chart for countries vs number of tweets
    if(!this.topicsTerm){
      this.topicsTerm=null;
    }
    if(!this.countryTerm){
      this.countryTerm=null;
    }
    if(!this.languagesTerm){
      this.languagesTerm=null;
    }
    if(this.add_filter){
      this.filter = ["dis_info"]
    }
    else{
      this.filter = null;
    }
    const data = {
      "query": this.queryTerm,
      "country": this.countryTerm,
      "poi_name": this.topicsTerm,
      "language": this.languagesTerm,
      "start":this.start,
      "rows":20,
      "additional_filters":this.filter
  }
    
    return this.http.post(baseUrl3, data);
  }

  wordcloud(val:string){
    if(!this.topicsTerm){
      this.topicsTerm=null;
    }
    if(!this.countryTerm){
      this.countryTerm=null;
    }
    if(!this.languagesTerm){
      this.languagesTerm=null;
    }
    if(this.add_filter){
      this.filter = ["dis_info"]
    }
    else{
      this.filter = null;
    }
    const data = {
      "query": this.queryTerm,
      "country": this.countryTerm,
      "poi_name": this.topicsTerm,
      "language": this.languagesTerm,
      "start":this.start,
      "rows":20,
      "additional_filters":this.filter
  }
  console.log(data)
    return this.http.post(baseUrl4, data);
  }

  searchTweetSentiment(val:string){
    if(!this.countryTerm){
      this.countryTerm=null;
    }
    if(this.add_filter){
      this.filter = ["dis_info"]
    }
    else{
      this.filter = null;
    }
   
    const data = {
      "query": this.queryTerm,
      "country": this.countryTerm,
      "start":this.start,
      "rows":20,
      "additional_filters":this.filter
  }
      return this.http.post(baseUrl6, data);
  }

  voice(){
    const data = {
      "query": this.queryTerm,
      "country": this.countryTerm,
      "start":this.start,
      "rows":20
  }
    
    return this.http.post(baseUrl7, data)
  }

}
