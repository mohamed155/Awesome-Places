import { Component } from '@angular/core';
import {
  LoadingController,
  ModalController,
  NavController,
  NavParams,
  ToastController
} from 'ionic-angular';
import {NgForm} from "@angular/forms";
import {SetLocationPage} from "../set-location/set-location";
import {Location} from "../../models/location";
import {Camera, Geolocation} from "ionic-native";

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
  imgURL = '';

  constructor(public navCtrl: NavController, public navParams: NavParams,
              public modalCtrl: ModalController, public toastCtrl: ToastController,
              public loadingCtrl: LoadingController) {
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

  onLocate() {
    const loading = this.loadingCtrl.create({
      content:'Getting you location ...'
    });
    loading.present();
    Geolocation.getCurrentPosition()
      .then(location => {
        loading.dismiss();
        this.loc.lat = location.coords.latitude;
        this.loc.lng = location.coords.longitude;
        this.locationIsSet = true;
      })
      .catch(error => {
        loading.dismiss();
        this.toastCtrl.create({
          message: 'Could not get your location, please pick it manually',
          duration: 2500
        }).present();
      });
  }

  onOpenCamera() {
    const loading = this.loadingCtrl.create({
      content: 'Please wail ...'
    });
    loading.present();
    Camera.getPicture({
      encodingType: Camera.EncodingType.JPEG,
      correctOrientation: true
    })
      .then(imgData => {
        loading.dismiss();
        this.imgURL = imgData;
      })
      .catch( error => {
        console.log(error);
      });
  }

}
