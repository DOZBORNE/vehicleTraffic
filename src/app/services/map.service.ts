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
  // radius = [3, 4, 5, 8, 10];
  radius = [4, 5, 6, 10, 15];

  // USED FOR STYLE FILTERS FOR CIRCLES
  // USED FOR STYLE FILTERS FOR CIRCLES
  // USED FOR STYLE FILTERS FOR CIRCLES
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

  // TRIGGERED BY ONKEYUP FROM DATA BINDING IN CABID INPUT BOX
  // TRIGGERED BY ONKEYUP FROM DATA BINDING IN CABID INPUT BOX
  // TRIGGERED BY ONKEYUP FROM DATA BINDING IN CABID INPUT BOX
  // TRIGGERED BY ONKEYUP FROM DATA BINDING IN CABID INPUT BOX
  filterFeatures(day: string, hour: string, cabID: string) {
    if (cabID.length === 4) {
      console.log('PRITNED');
      this.filterTime(day, hour, cabID);
    } else if (cabID.length == 0) {
      console.log('HEYT');

      this.filterTime(day, hour, cabID);
    }
  }

  // TRIGGERED BY TOGGLE INPUT SEARCH FIELDS
  // TRIGGERED BY TOGGLE INPUT SEARCH FIELDS
  // TRIGGERED BY TOGGLE INPUT SEARCH FIELDS
  // TRIGGERED BY TOGGLE INPUT SEARCH FIELDS
  filterTime(day: string, hour: string, cabID: string) {
    console.log(cabID);

    let cabFilter;

    if (!cabID || cabID.length !== 4) {
      console.log('cab ID 0');
      cabFilter = ['!=', ['string', ['get', 'CabID']], 'placeholder'];
    } else {
      console.log('cab ID valid');
      const newCabID = cabID.toUpperCase();
      cabFilter = ['==', ['string', ['get', 'CabID']], newCabID];
    }

    const p = parseInt(hour);
    const addHour = p + 1;
    const newHour = addHour.toString();

    let newTime = new Date(`2019-8-${day} ${hour}:00:00`);
    let time2 = new Date(`2019-8-${day} ${newHour}:00:00`);
    // let time2 = new Date(2019, 7, parseInt(time) + 1);
    let iso = newTime.toISOString().replace('T', ' ').replace('Z', '');
    let iso2 = time2.toISOString().replace('T', ' ').replace('Z', '');

    console.log(iso);
    console.log(iso2);

    const dateFilter = [
      'all',
      ['>=', ['get', 'Timestamp'], iso],
      ['<', ['get', 'Timestamp'], iso2],
    ];

    this.map.setFilter('locations', ['all', dateFilter, cabFilter]);
  }

  // LOADS LAYER AND PROVIDES DEFAULT STYLING FOR POINTS
  // LOADS LAYER AND PROVIDES DEFAULT STYLING FOR POINTS
  // LOADS LAYER AND PROVIDES DEFAULT STYLING FOR POINTS
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
            // 200,
            this.colors[0],
            // 400,
            this.mag2,
            this.colors[1],
            // 600,
            this.mag3,
            this.colors[2],
            // 800,
            this.mag4,
            this.colors[3],
            // 1000,
            // this.mag5,
            this.colors[4],
          ],

          'circle-radius': [
            'case',
            this.mag1,
            // 200,
            this.radius[0],
            // 400,
            this.mag2,
            this.radius[1],
            // 600,
            this.mag3,
            this.radius[2],
            // 800,
            this.mag4,
            this.radius[3],
            // 1000,
            // this.mag5,
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
