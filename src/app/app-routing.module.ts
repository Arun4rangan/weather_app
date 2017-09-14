import { NgModule } from '@angular/core'
import { Routes, RouterModule } from '@angular/router'

import { CurrentWeatherComponent } from './current-weather.component'
import { WeekWeatherComponent } from './week-weather.component'

const routes : Routes = [
  {
    path:'current',
    component: CurrentWeatherComponent
  },
  {
    path: 'week-weather',
    component: WeekWeatherComponent
  },
  {
    path: '',
    redirectTo: '/current',
    pathMatch: 'full'
  }
]

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [ RouterModule ]
})

export class AppRoutingModule {}