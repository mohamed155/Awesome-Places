import {Storage} from "@ionic/storage";
import {Place} from "../models/place";
import {Location} from "../models/location";
import {Injectable} from "@angular/core";
import {LoadingController, ToastController} from "ionic-angular";

@Injectable()
export class PlacesService {

  constructor(private storage: Storage, private toastCtrl: ToastController, private loadingCtrl: LoadingController) {
  }

  private places: Place[] = [];

  addPlace(title: string, description: string, location: Location, imgURL: string) {
    const place = new Place(title, description, location, imgURL);
    this.places.push(place);
    this.storage.set('places', this.places)
      .then()
      .catch(
        err => {
          this.places.splice(this.places.indexOf(place), 1);
          this.toastCtrl.create({
            message: 'Could not add your place. Please free up some space!',
            duration: 2500
          }).present();
        }
      );
  }

  loadPlaces() {
    return this.places.slice();
  }

  fetchPlaces() {
    const loading = this.loadingCtrl.create({
      content: 'Please wait...'
    });
    loading.present();
    this.storage.get('places')
      .then((places: Place[]) => {
        this.places = places != null ? places : [];
        loading.dismiss();
      })
      .catch(
        err => {
          loading.dismiss();
          this.toastCtrl.create({
            message: 'Could not retrieve your stored places!',
            duration: 2500
          }).present();
        }
      );
  }

  deletePlace(index: number) {
    this.places.splice(index, 1);
  }
}
