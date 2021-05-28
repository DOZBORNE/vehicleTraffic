// import { environment } from './../../../environments/environment.prod';
import { MapService } from './../../services/map.service';
import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-map',
  templateUrl: './map.component.html',
  styleUrls: ['./map.component.css'],
})
export class MapComponent implements OnInit {
  public mapData = {};

  colors = ['#3BB3C3', '#669EC4', '#8B88B6', '#A2719B', '#AA5E79'];
  radius = [3, 4, 5, 8, 10];

  constructor(private mapService: MapService) {}

  ngOnInit(): void {
    this.mapService.buildMap();

    // this.mapService.getMarkers().subscribe((data) => (this.mapData = data));

    this.mapService.loadMap();
  }
}
