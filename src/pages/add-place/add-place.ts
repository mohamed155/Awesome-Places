import { Component } from '@angular/core';
import {ModalController, NavController, NavParams} from 'ionic-angular';
import {NgForm} from "@angular/forms";
import {SetLocationPage} from "../set-location/set-location";
import {Location} from "../../models/location";

@Component({
  selector: 'page-add-place',
  templateUrl: 'add-place.html',
})
export class AddPlacePage {

  loc: Location = {
    lat: 40.7624324,
    lng: -73.9759827
  };
  locationIsSet = false;

  constructor(public navCtrl: NavController, public navParams: NavParams,
              public modalCtrl: ModalController) {
  }

  onSubmit(form: NgForm) {
    console.log(form.value);
  }

  onOpenMap() {
    const modal = this.modalCtrl.create(SetLocationPage, {location: this.loc, isSet: this.locationIsSet});
    modal.present();
    modal.onDidDismiss(data => {
      console.log(data);
      if (data) {
        this.loc = data.location;
        this.locationIsSet = true;
      }
    });
  }

}
