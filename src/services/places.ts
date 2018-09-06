import {Place} from "../models/place";
import {Location} from "../models/location";

export class PlacesService {

  private places: Place[] = [];

  addPlace(title: string, description: string, location: Location, imgURL: string) {
    this.places.push( new Place(title,description, location, imgURL));
  }

  loadPlaces () {
    return this.places.slice();
  }
}
