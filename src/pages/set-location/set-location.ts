import { Component } from '@angular/core';
import {NavController, NavParams, ViewController} from 'ionic-angular';
import {Location} from "../../models/location";

@Component({
  selector: 'page-set-location',
  templateUrl: 'set-location.html',
})
export class SetLocationPage {

  loc: Location;
  marker: Location;

  constructor(public navCtrl: NavController, public navParams: NavParams, public viewCtrl: ViewController) {
    this.loc = this.navParams.get('location');
    if (this.navParams.get('isSet')) {
      this.marker = this.loc;
    }
  }

  onSetMarker(event: any) {
    this.marker = new Location(event.coords.lat, event.coords.lng);
  }

  onConfirm() {
    this.viewCtrl.dismiss({location: this.marker});
  }

  onAbort() {
    this.viewCtrl.dismiss();
  }

}
