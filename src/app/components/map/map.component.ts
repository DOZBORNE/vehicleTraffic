// import { environment } from './../../../environments/environment.prod';
import { MapService } from './../../services/map.service';
import { Component, Input, OnInit } from '@angular/core';

@Component({
  selector: 'app-map',
  templateUrl: './map.component.html',
  styleUrls: ['./map.component.css'],
})
export class MapComponent implements OnInit {
  public mapData = {};

  CabID: string;

  // UNUSED FILTERS
  // UNUSED FILTERS
  // UNUSED FILTERS
  // UNUSED FILTERS
  // UNUSED FILTERS

  // filters for classifying earthquakes into five categories based on impnitude
  // imp1 = ['<', ['to-number', ['get', 'Impressions']], 200];
  // imp2 = [
  //   'all',
  //   ['>=', ['to-number', ['get', 'Impressions']], 200],
  //   ['<', ['to-number', ['get', 'Impressions']], 500],
  // ];
  // imp3 = [
  //   'all',
  //   ['>=', ['to-number', ['get', 'Impressions']], 500],
  //   ['<', ['to-number', ['get', 'Impressions']], 700],
  // ];
  // imp4 = [
  //   'all',
  //   ['>=', ['to-number', ['get', 'Impressions']], 700],
  //   ['<', ['to-number', ['get', 'Impressions']], 900],
  // ];
  // imp5 = ['>=', ['to-number', ['get', 'Impressions']], 900];

  // UNUSED FILTERS END
  // UNUSED FILTERS END
  // UNUSED FILTERS END
  // UNUSED FILTERS END
  // UNUSED FILTERS END

  colors = ['#3BB3C3', '#669EC4', '#8B88B6', '#A2719B', '#AA5E79'];
  radius = [3, 4, 5, 8, 10];

  constructor(private mapService: MapService) {}

  ngOnInit(): void {
    this.mapService.buildMap();

    // this.mapService.getMarkers().subscribe((data) => (this.mapData = data));

    this.mapService.loadMap();
  }
}
