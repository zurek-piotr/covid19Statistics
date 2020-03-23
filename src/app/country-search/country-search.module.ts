import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { HttpClientModule } from '@angular/common/http';

import { AppRoutingModule } from '../app-routing.module';

import { CountrySearchComponent } from './country-search.component';
import { GlobalStatisticsComponent } from '../global-statistics/global-statistics.component';
import { CountryStatisticsComponent } from '../country-statistics/country-statistics.component';

@NgModule({
  declarations: [
    CountrySearchComponent,
    GlobalStatisticsComponent,
    CountryStatisticsComponent,
  ],
  imports: [
    CommonModule,
    ReactiveFormsModule,
    FormsModule,
    HttpClientModule,
    AppRoutingModule,
  ],
  exports: [CountrySearchComponent],
})
export class CountrySearchModule {}
