import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { CountrySearchService } from '../country-search/country-search.service';

@Component({
  selector: 'app-country-statistics',
  templateUrl: './country-statistics.component.html',
  styleUrls: ['./country-statistics.component.scss'],
  providers: [CountrySearchService],
})
export class CountryStatisticsComponent implements OnInit {
  countryStatistic: any;
  constructor(
    private countrySearchService: CountrySearchService,
    private activeRoute: ActivatedRoute,
  ) {}

  ngOnInit(): void {
    this.activeRoute.params.subscribe(params => {
      let id = params['id'];
      if (id) {
        this.countrySearchService
          .getCountryStatisticStream(`${id.toUpperCase()}`)
          .subscribe(data => {
            this.countryStatistic = data;
          });
      }
    });
  }
}
