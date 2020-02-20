import { Component, OnInit } from '@angular/core';
import { EstateService } from 'src/app/core/estate.service';

@Component({
  selector: 'app-estate',
  templateUrl: './estate.component.html',
  styleUrls: ['./estate.component.css']
})
export class EstateComponent implements OnInit {
  inmuebles = ['casa', 'departamento', 'cuarto']

  constructor(public est: EstateService) { }

  ngOnInit() {
  }

  formatLabel(value: number) {
    if (value >= 1000) {
      return Math.round(value / 1000) + 'k';
    }

    return value;
  }

}
