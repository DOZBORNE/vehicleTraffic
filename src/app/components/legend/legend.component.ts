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

  getValue() {
    this.mapService.filterFeatures(this.dayInput, this.hourInput, this.cabID);
  }

  date() {
    this.mapService.filterTime(this.dayInput, this.hourInput, this.cabID);
  }

  ngOnInit(): void {}
}
