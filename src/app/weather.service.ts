import { Injectable } from '@angular/core';
import { Http }  from '@angular/http'

import { Observable } from 'rxjs/Observable';
import { Subject } from 'rxjs/Subject';


import 'rxjs/add/operator/toPromise';

@Injectable()
export class WeatherService {
  private emitChangeWeatherData = new Subject<Promise<any>>();
  weatherDataPromise : Promise<any>;
  changedWeather$ = this.emitChangeWeatherData.asObservable();

  private weatherUrl = 'https://cors-anywhere.herokuapp.com/https://api.darksky.net/forecast/46775eea3a83847258c84da2ff821095';

  constructor(private http: Http) {};

  getWeather(latitude: number, longitude: number): void {
    const url = `${this.weatherUrl}/${latitude},${longitude}`;
    this.emitChange(
      this.http.get(url)
        .toPromise()
        .then(response => response.json())
        .catch(this.handleError)
    );
  };

  private handleError(error:any): Promise<any>{
   console.log('Error has occured', error)
   return Promise.reject(error.message|| error)
  }

  emitChange(weatherPromise: Promise<any>): void {
    this.weatherDataPromise = weatherPromise
    this.emitChangeWeatherData.next(weatherPromise);
  }
}