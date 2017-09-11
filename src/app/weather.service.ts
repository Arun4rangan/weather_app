import { Injectable } from '@angular/core';
import { Http }  from '@angular/http'


import 'rxjs/add/operator/toPromise';

@Injectable()
export class WeatherService {
  private weatherUrl = 'https://cors-anywhere.herokuapp.com/https://api.darksky.net/forecast/46775eea3a83847258c84da2ff821095';

  constructor(private http: Http) {};

  getWeather(latitude: number, longitude: number): Promise<any> {
    const url = `${this.weatherUrl}/${latitude},${longitude}`;
    return this.http.get(url)
      .toPromise()
      .then(response => response.json())
      .catch(this.handleError)
  };

  private handleError(error:any): Promise<any>{
   console.log('Error has occured', error)
   return Promise.reject(error.message|| error)
  }
}