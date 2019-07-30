import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { HttpModule } from '@angular/http';

import { AppComponent } from './app.component';
import { MapComponent } from './map/map.component';
import { ChartComponent } from './chart/chart.component';
import { ChartModule } from 'angular2-highcharts';
import { HighchartsStatic } from 'angular2-highcharts/dist/HighchartsService';

@NgModule({
  declarations: [
    AppComponent,
    MapComponent,
    ChartComponent,
    

  ],
  imports: [
    BrowserModule,
    FormsModule,
    HttpModule,
    ChartModule

  ],
  providers: [HighchartsStatic],
  bootstrap: [AppComponent]
})
export class AppModule { }