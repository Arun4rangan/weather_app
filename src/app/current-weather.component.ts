import { Component } from '@angular/core';

import { WeatherService } from './weather.service'

import 'rxjs/add/operator/map';
import 'rxjs/add/operator/switchMap';

@Component({
  selector: 'current-weather',
  templateUrl: './current-weather.component.html',
  styleUrls: [],
})

export class CurrentWeatherComponent {
  weatherData: any={};
  loadingInProgress: boolean = true;
  userBlockLocation: boolean = false;

  constructor(
    private weatherService: WeatherService
    ) {
      weatherService.changedWeather$.subscribe(weatherData => {
        weatherData.then(data=> {
          this.loadingInProgress = false;
          this.weatherData=data
        })
      });
    };

};