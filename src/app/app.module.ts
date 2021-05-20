import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';

import { AppComponent } from './app.component';
import { MapComponent } from './components/map/map.component';
import { HttpClientModule } from '@angular/common/http';
import { LegendComponent } from './components/legend/legend.component';
import { FormsModule } from '@angular/forms';

@NgModule({
  declarations: [AppComponent, MapComponent, LegendComponent],
  imports: [BrowserModule, HttpClientModule, FormsModule],
  providers: [],
  bootstrap: [AppComponent],
})
export class AppModule {}
