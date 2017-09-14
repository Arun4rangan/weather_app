import { Component, Input, OnInit } from '@angular/core';
import { Http, Response } from '@angular/http';
import 'rxjs/add/operator/map';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})

export class AppComponent {
  title = 'Weather Network';
  public weatherData: any={};

  weatherDataHandler(data: any={}): void{
    this.weatherData = data
  }
};
