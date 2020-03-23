import { Component, OnInit } from '@angular/core';
import { FormControl } from '@angular/forms';
import { RouterLink } from '@angular/router';
import { debounceTime, distinctUntilChanged } from 'rxjs/operators';

import { CountrySearchService } from './country-search.service';

@Component({
  selector: 'app-country-search',
  templateUrl: './country-search.component.html',
  styleUrls: ['./country-search.component.scss'],
  providers: [CountrySearchService],
})
export class CountrySearchComponent implements OnInit {
  searchCountry: any;
  fullStatistics: any;
  filteredCountries: any;

  constructor(private countrySearchService: CountrySearchService) {}

  ngOnInit(): void {
    this.countrySearchService.getFullStatisticsStream().subscribe(data => {
      this.fullStatistics = data;
      this.filteredCountries = data;
    });
    this.searchCountry = new FormControl('');
    this.searchCountry.valueChanges
      .pipe(debounceTime(300), distinctUntilChanged())
      .subscribe(query => {
        this.filteredCountries = this.fullStatistics.filter(country =>
          country.name.toLowerCase().startsWith(query.toLowerCase()),
        );
      });
  }

  sortBy(property) {
    if (property === 'name') {
      this.filteredCountries = this.filteredCountries.sort((a, b) =>
        a.name.localeCompare(b.name),
      );
    } else {
      this.filteredCountries = this.filteredCountries.sort(
        (a, b) => b[property] - a[property],
      );
    }
  }
}
