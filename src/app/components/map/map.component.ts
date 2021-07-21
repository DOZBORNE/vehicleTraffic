import { MapService } from './map.service';
import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-map',
  templateUrl: './map.component.html',
  styleUrls: ['./map.component.css'],
})
export class MapComponent implements OnInit {
  constructor(private mapService: MapService) {}

  ngOnInit(): void {
    this.mapService.buildMap();

    // this.mapService.getMarkers().subscribe((data) => (this.mapData = data));

    this.mapService.loadMap();
  }
}
