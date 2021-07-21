import { Component, OnInit } from '@angular/core';
import { FilterService } from './filter.service';

@Component({
  selector: 'app-legend',
  templateUrl: './legend.component.html',
  styleUrls: ['./legend.component.css'],
})
export class LegendComponent implements OnInit {
  cabID: string;
  dayInput: string = '12';
  hourInput: string = '0';

  constructor(private filterService: FilterService) {}

  // TRIGGERED BY ONKEYUP FROM DATA BINDING IN CABID INPUT BOX
  // TRIGGERED BY ONKEYUP FROM DATA BINDING IN CABID INPUT BOX
  // TRIGGERED BY ONKEYUP FROM DATA BINDING IN CABID INPUT BOX
  // TRIGGERED BY ONKEYUP FROM DATA BINDING IN CABID INPUT BOX
  onFilterCabId() {
    if (this.cabID.length === 4) {
      this.filterService.filterTime(this.dayInput, this.hourInput, this.cabID);
    } else if (this.cabID.length < 4) {
      return;
    } else if (this.cabID.length === 0) {
      this.filterService.filterTime(this.dayInput, this.hourInput, this.cabID);
    }
  }

  filterDate() {
    this.filterService.filterTime(this.dayInput, this.hourInput, this.cabID);
  }

  ngOnInit(): void {}
}
