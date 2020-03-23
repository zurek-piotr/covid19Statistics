import { Component } from '@angular/core';
import { CountrySearchService } from './country-search/country-search.service';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss'],
  providers: [CountrySearchService],
})
export class AppComponent {
  lastUpdate: any;

  constructor(private countrySearchService: CountrySearchService) {}

  ngOnInit() {
    this.countrySearchService.getLastUpdateStream().subscribe(lastUpdate => {
      this.lastUpdate = lastUpdate;
    });
  }
}
