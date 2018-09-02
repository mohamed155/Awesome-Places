import { Component } from '@angular/core';
import { NavController, NavParams } from 'ionic-angular';
import {Location} from "../../models/location";

@Component({
  selector: 'page-set-location',
  templateUrl: 'set-location.html',
})
export class SetLocationPage {

  loc: Location;

  constructor(public navCtrl: NavController, public navParams: NavParams) {
    this.loc = this.navParams.get('location');
  }

  ionViewDidLoad() {
    console.log('ionViewDidLoad SetLocationPage');
  }

}
