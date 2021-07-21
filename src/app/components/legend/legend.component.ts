import { MapService } from './../../services/map.service';
import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-legend',
  templateUrl: './legend.component.html',
  styleUrls: ['./legend.component.css'],
})
export class LegendComponent implements OnInit {
  cabID: string;
  dayInput: string = '12';
  hourInput: string = '0';

  constructor(private mapService: MapService) {}

  // getValue() {
  //   this.mapService.filterFeatures(this.dayInput, this.hourInput, this.cabID);
  // }

  // TRIGGERED BY ONKEYUP FROM DATA BINDING IN CABID INPUT BOX
  // TRIGGERED BY ONKEYUP FROM DATA BINDING IN CABID INPUT BOX
  // TRIGGERED BY ONKEYUP FROM DATA BINDING IN CABID INPUT BOX
  // TRIGGERED BY ONKEYUP FROM DATA BINDING IN CABID INPUT BOX
  onFilterCabId() {
    if (this.cabID.length === 4) {
      this.mapService.filterTime(this.dayInput, this.hourInput, this.cabID);
    } else if (this.cabID.length < 4) {
      return;
    } else if (this.cabID.length === 0) {
      this.mapService.filterTime(this.dayInput, this.hourInput, this.cabID);
    }
  }

  filterDate() {
    this.mapService.filterTime(this.dayInput, this.hourInput, this.cabID);
  }

  ngOnInit(): void {}
}
