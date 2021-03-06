import { Injectable } from '@angular/core';
// import * as mapboxgl from 'mapbox-gl';
import * as mapboxgl from 'mapbox-gl/dist/mapbox-gl';
import { environment } from '../../../environments/environment';

@Injectable({
  providedIn: 'root',
})
export class MapService {
  map: mapboxgl.Map;
  style = 'mapbox://styles/mapbox/light-v10';
  lat = 43;
  lng = -75;
  zoom = 6;
  colors = ['#3BB3C3', '#669EC4', '#8B88B6', '#A2719B', '#AA5E79'];
  radius = [4, 5, 6, 10, 15];

  // USED FOR STYLE FILTERS FOR CIRCLES
  mag1 = ['<', ['get', 'Impressions'], 250];
  mag2 = [
    'all',
    ['>=', ['get', 'Impressions'], 250],
    ['<', ['get', 'Impressions'], 500],
  ];
  mag3 = [
    'all',
    ['>=', ['get', 'Impressions'], 500],
    ['<', ['get', 'Impressions'], 750],
  ];
  mag4 = [
    'all',
    ['>=', ['get', 'Impressions'], 750],
    ['<', ['get', 'Impressions'], 950],
  ];
  mag5 = ['>=', ['get', 'Impressions'], 1000];

  constructor() {
    mapboxgl.accessToken = environment.mapbox.accessToken;
  }

  buildMap() {
    this.map = new mapboxgl.Map({
      container: 'map',
      style: this.style,
      zoom: this.zoom,
      center: [this.lng, this.lat],
    });

    this.map.addControl(new mapboxgl.NavigationControl());
  }

  // LOADS LAYER AND PROVIDES DEFAULT STYLING FOR POINTS
  loadMap() {
    this.map.on('load', () => {
      const dayFilter = [
        'all',
        ['>=', ['get', 'Timestamp'], '2019-08-12 05:00:00.000'],
        ['<', ['get', 'Timestamp'], '2019-08-12 06:00:00.000'],
      ];

      const cabFilter = ['!=', ['string', ['get', 'CabID']], 'placeholder'];

      this.map.addLayer({
        id: 'locations',
        type: 'circle',
        source: {
          type: 'geojson',
          data: '../../assets/convertcsv.geojson',
        },
        paint: {
          'circle-color': [
            'case',
            this.mag1,
            this.colors[0],
            this.mag2,
            this.colors[1],
            this.mag3,
            this.colors[2],
            this.mag4,
            this.colors[3],
            this.colors[4],
          ],

          'circle-radius': [
            'case',
            this.mag1,

            this.radius[0],
            this.mag2,
            this.radius[1],
            this.mag3,
            this.radius[2],
            this.mag4,
            this.radius[3],
            this.radius[4],
          ],

          'circle-opacity': 0.8,
        },
        filter: ['all', dayFilter, cabFilter],
        // filter: ['==', ['get', 'CabID'], '1D55'],
      });
    });
  }
}
