import {Component} from '@angular/core';
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
import {Camera, Geolocation, File, FilePath} from "ionic-native";
import {PlacesService} from "../../services/places";

declare var cordova: any;

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
              public loadingCtrl: LoadingController, private placesService: PlacesService,
              private filePath: FilePath) {
  }

  onSubmit(form: NgForm) {
    this.placesService.addPlace(form.value.title, form.value.description, this.loc, this.imgURL);
    form.reset();
    this.loc = {
      lat: 40.7624324,
      lng: -73.9759827
    };
    this.locationIsSet = false;
    this.imgURL = '';
    this.navCtrl.popToRoot();
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
      content: 'Getting you location ...'
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
      quality: 100,
      destinationType: Camera.DestinationType.DATA_URL,
      encodingType: Camera.EncodingType.JPEG,
      mediaType: Camera.MediaType.PICTURE,
      allowEdit: true,
      targetWidth: 1000,
      targetHeight: 1000,
      saveToPhotoAlbum: false,
      correctOrientation: true
    })
      .then(imgData => {
        // FilePath.resolveNativePath(imgData)
        //   .then((path) => {
        //     console.log(imgData, path);
        //     let imagePath = path.substr(0, path.lastIndexOf("/") + 1);
        //     let imageName = path.substring(path.lastIndexOf("/") + 1, path.length);
        //     File.moveFile(imagePath, imageName, cordova.file.dataDirectory,
        //       new Date().getUTCMilliseconds() + '.jpg')
        //       .then(newFile => {
        //         console.log(newFile);
        //         this.imgURL = 'data:image/jpeg;base64,' + newFile.nativeURL;
        //       })
        //       .catch(err => {
        //         console.error(err);
        //         this.imgURL = '';
        //         const toast = this.toastCtrl.create({
        //           message: 'Could not save the image. Please try again!',
        //           duration: 2500
        //         });
        //         toast.present();
        //         Camera.cleanup();
        //       })
        //   })
        //   .catch((err) => {
        //     console.error(err);
        //   });
        // const currentName = imgData.replace(/^.*[\\\/]/, '');
        // const path = imgData.replace(/[^\/]*$/, '');
        // const newFileName = new Date().getUTCMilliseconds() + '.jpg';
        // File.moveFile(path, currentName, cordova.file.dataDirectory, newFileName)
        //   .then(
        //     data => {
        //       this.imgURL = 'data:image/jpeg;base64,' + data.nativeURL;
        //       Camera.cleanup();
        //       //File.removeFile(path, currentName);
        //     }
        //   )
        //   .catch(
        //     err => {
        //       this.imgURL = '';
        //       const toast = this.toastCtrl.create({
        //         message: 'Could not save the image. Please try again!',
        //         duration: 2500
        //       });
        //       toast.present();
        //       Camera.cleanup();
        //     }
        //   );
        this.imgURL = 'data:image/jpeg;base64,' + imgData;
        console.log(imgData);
        loading.dismiss();
      })
      .catch(error => {
        loading.dismiss();
        const toast = this.toastCtrl.create({
          message: 'Could not take the image. Please try again!',
          duration: 2500
        });
        toast.present();
      });
  }

}
