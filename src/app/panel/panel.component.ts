import { Component, OnInit } from '@angular/core';
import { interval } from 'rxjs';
import { flatMap } from 'rxjs/operators';
import { HttpClient, HttpHeaders } from '@angular/common/http';

@Component({
  selector: 'app-panel',
  templateUrl: './panel.component.html',
  styleUrls: ['./panel.component.css']
})
export class PanelComponent implements OnInit {

  private icons = [
    'person'
    /*'accessibility',
    'accessibility_new',
    'emoji_people',
    'airline_seat_flat',
    'sports_handball',
    'pool',
    'directions_walk',
    'directions_run'*/
  ];
  private status = [
    'check',
    'close',
    'error',
    'warning'
  ];
  private names = [
    'Vardenis Pavardenis'
  ];

  public deck: any[];
  public shift: any[];
  public crew: any[];

  constructor(private  httpClient: HttpClient) {
    this.deck = new Array(3).fill(undefined).map(() =>
      ({ icon: this.getRandom(this.icons), name: this.getRandom(this.names), status: this.getRandom(this.status)}));
    this.shift = new Array(18).fill(undefined).map(() =>
      ({ icon: this.getRandom(this.icons), name: this.getRandom(this.names), status: this.getRandom(this.status)}));
    this.crew = new Array(39).fill(undefined).map(() =>
      ({ icon: this.getRandom(this.icons), name: this.getRandom(this.names), status: this.getRandom(this.status)}));
  }

  getRandom(arr) {
    return arr[Math.floor(Math.random() * arr.length)];
  }

  ngOnInit() {
    interval(2000)
    .pipe(flatMap(() => this.httpClient.get<any>('https://cors-anywhere.herokuapp.com/https://backendble.azurewebsites.net/api/devices')))
    .subscribe(data => {
      if (Object.keys(data).length > 0) {
        this.deck = Object.keys(data).map(
          k => ({
            icon: this.getRandom(this.icons),
            name: `${data[k].key} (${data[k].signalStrength})`,
            status: data[k].isMissing
              ? this.status[1]
              : this.status[0]
          })
        ).sort((a, b) => (a.name > b.name) ? 1 : ((b.name > a.name) ? -1 : 0));
      }
    });
  }

}
