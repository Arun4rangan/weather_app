import { Component, ElementRef, NgZone, OnInit, ViewChild } from '@angular/core';
import { FormControl, FormsModule, ReactiveFormsModule } from "@angular/forms";
import { MapsAPILoader } from '@agm/core';
import {} from '@types/googlemaps';

@Component({
  selector: 'location',
  styles: [],
  template: `
    <div class="container">
      <input placeholder="Location" #search>
    </div>
  `
})

export class LocationComponent implements OnInit {
  private latitude: number;
  private longitude: number;

  @ViewChild("search")
  public searchElementRef: ElementRef;

  constructor(
    private mapsAPILoader: MapsAPILoader,
    private ngZone: NgZone
  ) {};

  ngOnInit() {
    this.mapsAPILoader.load().then(() => {
      let autocomplete = new google.maps.places
        .Autocomplete(
          this.searchElementRef.nativeElement,
          {types: ["(cities)"]}
        );

      autocomplete.addListener("place_changed", () => {
        this.ngZone.run(() => {
          let place: google.maps.places.PlaceResult = autocomplete.getPlace();

          if (place.geometry === undefined || place.geometry === null) {
            console.log(place)
            return;
          }
        });
      });
    });
  }


  getPosition(): void {
    if(navigator.geolocation){
        navigator.geolocation
          .getCurrentPosition(position =>{
            this.latitude = position.coords.latitude
            this.longitude = position.coords.longitude
          });
    };
  };
};