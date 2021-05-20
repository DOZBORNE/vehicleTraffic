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

  colors = ['#3BB3C3', '#669EC4', '#8B88B6', '#A2719B', '#AA5E79'];
  radius = [3, 4, 5, 8, 10];

  constructor(private mapService: MapService) {}

  ngOnInit(): void {
    this.mapService.buildMap();

    // this.mapService.getMarkers().subscribe((data) => (this.mapData = data));

    this.mapService.map.on('load', () => {
      this.mapService.map.addSource('streetMetrics', {
        type: 'vector',
        url: 'mapbox://dozborne.c1lekg5a',
        // url: 'mapbox://mapbox.mapbox-streets-v8',
      });

      // console.log(this.getMarkers());
      this.mapService.map.addLayer({
        id: 'locations',
        type: 'circle',
        /* Add a GeoJSON source containing place coordinates and information. */
        source: 'streetMetrics',
        'source-layer': 'streetMetrics-4hhet2',
        // source: {
        //   type: 'geojson',
        //   data: 'https://osbornex.com/streetmetrics.geojson',
        // },
        paint: {
          'circle-color': [
            'interpolate',
            ['linear'],
            ['to-number', ['get', 'Impressions']],
            // 'case',
            // this.imp1,
            200,
            this.colors[0],
            400,
            // this.imp2,
            this.colors[1],
            600,
            // this.imp3,
            this.colors[2],
            800,
            // this.imp4,
            this.colors[3],
            1000,
            this.colors[4],
          ],

          'circle-radius': [
            'interpolate',
            ['linear'],
            ['to-number', ['get', 'Impressions']],
            // 'case',
            // this.imp1,
            200,
            this.radius[0],
            400,
            // this.imp2,
            this.radius[1],
            600,
            // this.imp3,
            this.radius[2],
            800,
            // this.imp4,
            this.radius[3],
            1000,
            this.radius[4],
          ],
          //   'circle-radius': [
          //     'case',

          //     this.imp1,
          //     this.radius[0],
          //     this.imp2,
          //     this.radius[1],
          //     this.imp3,
          //     this.radius[2],
          //     this.imp4,
          //     this.radius[3],
          //     this.radius[4],
          //   ],
          'circle-opacity': 0.8,
        },
        // filter: ['==', ['get', 'CabID'], '1D55'],
      });

      // this.mapService.map.setFilter('locations', [
      //   'match',
      //   ['get', 'CabID']

      // const bois = this.mapService.map.queryRenderedFeatures({
      //   layers: ['locations'],
      // });
      // console.log(bois, 'rendered features');
    });
  }
}
