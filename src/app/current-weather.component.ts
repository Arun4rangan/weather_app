import { Component, OnInit } from '@angular/core';

import { WeatherService } from './weather.service'

import 'rxjs/add/operator/map';

@Component({
  selector: 'current-weather',
  templateUrl: './current-weather.component.html',
  styleUrls: [],
  providers:[WeatherService]
})

export class CurrentWeatherComponent implements OnInit {
  local_weather: any={};
  loadingInProgress: boolean = true;
  userBlockLocation: boolean = false;

  constructor(private weatherService: WeatherService) {};

  ngOnInit(){
    this.getPosition()
  };


  getPosition(): void {
    if(navigator.geolocation){
        navigator.geolocation
          .getCurrentPosition(position =>{
            const latitude = position.coords.latitude
            const longitude = position.coords.longitude
            this.weatherService.getWeather(latitude, longitude)
              .then(data => {
                this.local_weather = data
                this.loadingInProgress = false
                console.log(data)
              });
          },(error => {
            this.userBlockLocation = true;
            this.handleError(error)
          }));
    } else {
      console.log('This browser does not support geolocation')
    };
  };

  private handleError(error:any): Promise<any>{
    console.log('Error has occured', error)
    return Promise.reject(error.message|| error)
  };
};