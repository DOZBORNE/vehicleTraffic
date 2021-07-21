import { MapService } from './../map/map.service';
import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root',
})
export class FilterService {
  constructor(private mapServive: MapService) {}

  // TRIGGERED BY TOGGLE INPUT SEARCH FIELDS
  filterTime(day: string, hour: string, cabID: string) {
    let cabFilter: [
      a: string,
      x: [b: string, y: [c: string, d: string]],
      e: string
    ];

    if (!cabID || cabID.length !== 4) {
      // console.log('cab ID 0');
      cabFilter = ['!=', ['string', ['get', 'CabID']], 'placeholder'];
    } else {
      // console.log(cabID);
      // console.log('cab ID valid');
      const newCabID = cabID.toUpperCase();
      cabFilter = ['==', ['string', ['get', 'CabID']], newCabID];
    }

    const hourPlusOne = (+hour + 1).toString();

    let hourStart = new Date(`2019-8-${day} ${hour}:00:00`)
      .toISOString()
      .replace('T', ' ')
      .replace('Z', '');
    let hourFinish = new Date(`2019-8-${day} ${hourPlusOne}:00:00`)
      .toISOString()
      .replace('T', ' ')
      .replace('Z', '');

    // console.log(hourStart);
    // console.log(hourFinish);

    const dateFilter = [
      'all',
      ['>=', ['get', 'Timestamp'], hourStart],
      ['<', ['get', 'Timestamp'], hourFinish],
    ];

    this.mapServive.map.setFilter('locations', ['all', dateFilter, cabFilter]);
  }
}
