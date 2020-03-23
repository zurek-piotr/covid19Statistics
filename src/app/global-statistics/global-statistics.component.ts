import { Component, OnInit } from '@angular/core';
import { CountrySearchService } from '../country-search/country-search.service';

@Component({
  selector: 'app-global-statistics',
  templateUrl: './global-statistics.component.html',
  styleUrls: ['./global-statistics.component.scss'],
  providers: [CountrySearchService],
})
export class GlobalStatisticsComponent implements OnInit {
  globalStatistics: any;

  constructor(private countrySearchService: CountrySearchService) {}

  ngOnInit(): void {
    this.countrySearchService.getGlobalStatisticsStream().subscribe(data => {
      this.globalStatistics = data;
    });
  }
}
