import { Injectable } from '@angular/core';
// import * as mapboxgl from 'mapbox-gl';
import * as mapboxgl from 'mapbox-gl/dist/mapbox-gl';
import { environment } from '../../environments/environment';
import { HttpClient } from '@angular/common/http';
import { FeatureCollection } from '../map';

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

  private url: string = '../assets/map.Json';

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

  getMarkers() {
    return this.http.get(this.url);

    // return [
    //   {
    //     type: 'Feature',
    //     geometry: {
    //       type: 'Point',
    //       coordinates: ['80.20929129999999', '13.0569951'],
    //     },
    //     properties: {
    //       message: 'Chennai',
    //     },
    //   },
    //   {
    //     type: 'Feature',
    //     geometry: {
    //       type: 'Point',
    //       coordinates: ['77.350048', '12.953847'],
    //     },
    //     properties: {
    //       message: 'bangulare',
    //     },
    //   },
    // ];
  }

  filterFeatures(cabID: string) {
    this.map.setFilter('locations', ['==', ['get', 'CabID'], cabID]);
    if (cabID == '' || cabID == ' ') {
      this.map.setFilter('locations', [
        '==',
        ['get', 'CabID'],
        ['get', 'CabID'],
      ]);
    }
  }

  plot() {
    this.map.on('load', (event) => {
      // add the real time map data

      this.map.addSource('streetMetrics', {
        type: 'vector',
        // Use any Mapbox-hosted tileset using its tileset id.
        // Learn more about where to find a tileset id:
        // https://docs.mapbox.com/help/glossary/tileset-id/
        // url: 'mapbox://dozborne.ckouv0ww0059021la7urm44dg-18ukw',
        url: 'mapbox://mapbox.mapbox-streets-v8',
      });

      console.log(this.getMarkers());
      this.map.addLayer({
        id: 'locations',
        type: 'circle',
        /* Add a GeoJSON source containing place coordinates and information. */
        source: 'streetMetrics',
        // source: {
        //   type: 'geojson',
        //   data: this.getMarkers(),
        // },
      });
      console.log('Points plotted');
    });
  }
}

//   plot() {
//     this.map.on('load', (event) => {
//       // add the real time map data
//       console.log(this.getMarkers());
//       this.map.addLayer({
//         id: 'locations',
//         type: 'circle',
//         /* Add a GeoJSON source containing place coordinates and information. */
//         source: {
//           type: 'geojson',
//           data: this.getMarkers(),
//         },
//       });
//       console.log('Points plotted');
//     });
//   }
// }
