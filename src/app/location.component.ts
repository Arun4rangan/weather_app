import { Component, ElementRef, NgZone, OnInit, ViewChild, Output, EventEmitter } from '@angular/core';
import { Router } from '@angular/router';
import { FormControl, FormsModule, ReactiveFormsModule } from "@angular/forms";

import { WeatherService } from './weather.service'

import { MapsAPILoader } from '@agm/core';
import {} from '@types/googlemaps';

@Component({
  selector: 'location',
  styles: [],
  templateUrl: './location.component.html',
})

export class LocationComponent implements OnInit {
  private localAddress: string;
  private latlng: any = {};
  @Output() weatherData= new EventEmitter();


  @ViewChild("search")
  public searchElementRef: ElementRef;

  constructor(
    private mapsAPILoader: MapsAPILoader,
    private ngZone: NgZone,
    private weatherService: WeatherService
  ) {};

  ngOnInit() {
    this.mapsAPILoader.load().then(() => {
      let autocomplete = new google.maps.places
        .Autocomplete(
          this.searchElementRef.nativeElement,
          {types: ['(cities)']}
        );

      this.getPosition();

      autocomplete.addListener('place_changed', () => {
        this.ngZone.run(() => {
          let place: google.maps.places.PlaceResult = autocomplete.getPlace();

          if (place.geometry === undefined || place.geometry === null) {
            return;
          };
          this.getWeather(place.geometry.location)

        });
      });
    });
  }

  getPosition(): void {
    let geocoder = new google.maps.Geocoder()
    if(navigator.geolocation){
      navigator.geolocation.getCurrentPosition(position =>{
        const latlng  = new google.maps.LatLng(
          position.coords.latitude,
          position.coords.longitude
        )
        this.getWeather(latlng)
        geocoder.geocode({ 'location': latlng}, (results, status) => {
          if (status !== google.maps.GeocoderStatus.OK) {
            alert(status);
          }
          if (status == google.maps.GeocoderStatus.OK) {
            const city = results.filter(x => {return x.types.toString() == 'locality,political'})
            if (city) {
              this.localAddress = city[0].formatted_address
            }
          }
        });
      });
    }
  };

  getWeather(latlng: google.maps.LatLng):void{
    if (latlng){
      this.weatherService.getWeather(latlng.lat(),latlng.lng())
    };
  };
};