import { Component, ElementRef, NgZone, OnInit, ViewChild, Input } from '@angular/core';
import { FormControl, FormsModule, ReactiveFormsModule } from "@angular/forms";
import { MapsAPILoader } from '@agm/core';
import {} from '@types/googlemaps';

@Component({
  selector: 'location',
  styles: [],
  templateUrl: './location.component.html'
})

export class LocationComponent implements OnInit {
  private latitude: number;
  private longitude: number;
  @Input() localAddress: string;

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
          {types: ['(cities)']}
        );

      this.getPosition();
      console.log('moving')
      autocomplete.addListener('place_changed', () => {
        this.ngZone.run(() => {
          let place: google.maps.places.PlaceResult = autocomplete.getPlace();

          console.log(place)

          if (place.geometry === undefined || place.geometry === null) {
            return;
          };
        });
      });
    });
  }

  getPosition(): void {
    let geocoder = new google.maps.Geocoder()
    if(navigator.geolocation){
      navigator.geolocation.getCurrentPosition(position =>{
        const latlng = new google.maps.LatLng(
          position.coords.latitude,
          position.coords.longitude
        )
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
};