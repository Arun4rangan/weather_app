import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';
import { FormsModule, ReactiveFormsModule }   from '@angular/forms';
import { HttpModule } from '@angular/http';
import { NgbModule } from '@ng-bootstrap/ng-bootstrap';

import { AgmCoreModule } from '@agm/core';

import { AppComponent } from './app.component';
import { CurrentWeatherComponent } from './current-weather.component'
import { LocationComponent } from './location.component'

@NgModule({
  imports: [
    BrowserModule,
    FormsModule,
    HttpModule,
    NgbModule,
    AgmCoreModule.forRoot({
      apiKey: 'AIzaSyC6ZUP9zXPPFS7B5jcLf24kv2CrOA7xG94',
      libraries: ["places"]
    }),
    ReactiveFormsModule
  ],
  declarations: [
    AppComponent,
    CurrentWeatherComponent,
    LocationComponent
  ],
  providers: [
    AppComponent
  ],
  bootstrap: [AppComponent]
})
export class AppModule { }
