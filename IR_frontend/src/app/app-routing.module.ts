import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { HomepageComponent } from './homepage/homepage.component';
import { AnalyticsComponent } from './analytics/analytics.component';
import { SearchComponent } from './search/search.component';


const routes: Routes = [
  { path: '', redirectTo: '/homepage-component', pathMatch: 'full' },
  { path: 'homepage-component', component: HomepageComponent },
  { path: 'home', component: HomepageComponent },
  { path: 'overview_analytics', component: AnalyticsComponent },
  // { path: 'search', component: SearchComponent}
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
