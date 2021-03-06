import { Component, Input,  OnInit } from '@angular/core'

import { WeatherService } from './weather.service'

@Component({
  selector:'week-weather',
  templateUrl: './week-weather.component.html'
})

export class WeekWeatherComponent implements OnInit {
  @Input() weatherData: any={};
  private loadingInProgress: boolean = true;

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

  ngOnInit(){
    this.weatherService.weatherDataPromise.then(data=>{
      this.loadingInProgress = false;
      this.weatherData=data
    })
  }
}