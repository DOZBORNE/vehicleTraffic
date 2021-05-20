import { Injectable } from '@angular/core';
// import * as mapboxgl from 'mapbox-gl';
import * as mapboxgl from 'mapbox-gl/dist/mapbox-gl';
import { environment } from '../../environments/environment';
import { HttpClient } from '@angular/common/http';

@Injectable({
  providedIn: 'root',
})
export class MapService {
  map: mapboxgl.Map;
  style = 'mapbox://styles/mapbox/light-v10';
  // style = 'mapbox://styles/dozborne/ckevp5arf28wy19l9awnjzrg2';
  lat = 43;
  lng = -75;
  zoom = 6;
  colors = ['#3BB3C3', '#669EC4', '#8B88B6', '#A2719B', '#AA5E79'];
  radius = [3, 4, 5, 8, 10];

  constructor(private http: HttpClient) {
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

  filterFeatures(cabID: string) {
    this.map.setFilter('locations', ['==', ['get', 'CabID'], cabID]);
    if (
      cabID == '' ||
      cabID == ' ' ||
      cabID == '  ' ||
      cabID == '   ' ||
      cabID == '    '
    ) {
      this.map.setFilter('locations', [
        '==',
        ['get', 'CabID'],
        ['get', 'CabID'],
      ]);
    }
  }

  loadMap() {
    this.map.on('load', () => {
      this.map.addSource('streetMetrics', {
        type: 'vector',
        url: 'mapbox://dozborne.c1lekg5a',
        // url: 'mapbox://mapbox.mapbox-streets-v8',
      });

      // console.log(this.getMarkers());
      this.map.addLayer({
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
