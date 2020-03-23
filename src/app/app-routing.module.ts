import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

import { CountrySearchComponent } from './country-search/country-search.component';
import { CountryStatisticsComponent } from './country-statistics/country-statistics.component';

const routes: Routes = [
  { path: '', component: CountrySearchComponent, pathMatch: 'full' },
  { path: ':id', component: CountryStatisticsComponent, pathMatch: 'full' },
  { path: '**', component: CountrySearchComponent, pathMatch: 'full' },
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule],
})
export class AppRoutingModule {}
