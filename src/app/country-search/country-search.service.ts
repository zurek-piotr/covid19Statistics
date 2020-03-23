import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Router } from '@angular/router';
import { Subject } from 'rxjs';

@Injectable({
  providedIn: 'root',
})
export class CountrySearchService {
  API = 'https://covid19.mathdro.id/api';
  countries = [];
  fullStatistics = [];
  countryStatistic: any;
  globalStatistics: any;
  lastUpdate: any;
  fullStatsticsStream$ = new Subject();
  globalStatisticsStream$ = new Subject();
  countriesStream$ = new Subject();
  countryStatisticStream$ = new Subject();
  lastUpdateStream$ = new Subject();

  constructor(private http: HttpClient, private router: Router) {}

  getFullStatisticsStream() {
    if (!this.fullStatistics.length) {
      this.getFullStatistics();
    }
    return this.fullStatsticsStream$;
  }

  getFullStatistics() {
    return this.getCountriesStream().subscribe((_countries: any) => {
      for (let country of _countries) {
        this.http.get(`${this.API}/countries/${country.code}`).subscribe(
          (data: any) => {
            this.fullStatistics.push({
              name: country.name,
              code: country.code,
              confirmed: data.confirmed.value,
              recovered: data.recovered.value,
              deaths: data.deaths.value,
            });
          },
          () => {
            this.fullStatistics.push({
              name: country.name,
              code: country.code,
              confirmed: 0,
              recovered: 0,
              deaths: 0,
            });
          },
        );
      }
      this.fullStatsticsStream$.next(this.fullStatistics);
    });
  }
  getCountriesStream() {
    if (!this.countries.length) {
      this.getCountries();
    }
    return this.countriesStream$;
  }
  getCountries() {
    return this.http.get(`${this.API}/countries`).subscribe((data: any) => {
      let _countries = Object.entries(data.countries);
      for (let country of _countries) {
        this.countries.push({
          name: `${country[0]}`,
          code: `${country[1]}`,
        });
      }
      this.countriesStream$.next(this.countries);
    });
  }
  getCountryStatisticStream(countryCode) {
    if (!this.countryStatistic) {
      this.getCountryStatistic(countryCode);
    }
    return this.countryStatisticStream$;
  }
  getCountryStatistic(countryCode) {
    return this.http.get(`${this.API}/countries`).subscribe((data: any) => {
      let _countries = Object.entries(data.countries);
      let name: any = _countries.find(country => country[1] === countryCode);
      if (name === undefined) this.router.navigate(['']);
      else {
        name = name.slice(0, 1);
      }
      this.http.get(`${this.API}/countries/${countryCode}`).subscribe(
        (data: any) => {
          this.countryStatistic = {
            name: name,
            code: countryCode,
            confirmed: data.confirmed.value,
            recovered: data.recovered.value,
            deaths: data.deaths.value,
          };
          this.countryStatisticStream$.next(this.countryStatistic);
        },
        () => {
          this.countryStatistic = {
            name: name,
            code: countryCode,
            confirmed: 0,
            recovered: 0,
            deaths: 0,
          };
          this.countryStatisticStream$.next(this.countryStatistic);
        },
      );
    });
  }
  getGlobalStatisticsStream() {
    if (!this.globalStatistics) {
      this.getGlobalStatistics();
    }
    return this.globalStatisticsStream$;
  }
  getGlobalStatistics() {
    return this.http.get(this.API).subscribe((data: any) => {
      this.globalStatistics = {
        confirmed: data.confirmed.value,
        recovered: data.recovered.value,
        deaths: data.deaths.value,
      };
      this.globalStatisticsStream$.next(this.globalStatistics);
    });
  }
  getLastUpdateStream() {
    if (!this.lastUpdate) {
      this.getLastUpdate();
    }
    return this.lastUpdateStream$;
  }
  getLastUpdate() {
    return this.http.get(this.API).subscribe(({ lastUpdate }: any) => {
      this.lastUpdate = lastUpdate;
      this.lastUpdateStream$.next(this.lastUpdate);
    });
  }
}
