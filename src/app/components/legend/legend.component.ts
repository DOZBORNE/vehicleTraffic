import { MapService } from './../../services/map.service';
import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-legend',
  templateUrl: './legend.component.html',
  styleUrls: ['./legend.component.css'],
})
export class LegendComponent implements OnInit {
  cabID: string;

  constructor(private mapService: MapService) {}

  getValue() {
    // const value = this.cabID.toUpperCase();
    // console.log(value);
    this.mapService.filterFeatures(this.cabID.toUpperCase());
  }
  ngOnInit(): void {}
}
