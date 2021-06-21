import { locationValidator } from './../../shared/validators/location-validator';
import { HttpClient } from '@angular/common/http';
import { environment } from './../../../environments/environment';
import { Observable, BehaviorSubject } from 'rxjs';
import { Location, Position, Suggestion, LocationDetailsResponse } from './../../shared/models/location';
import { FormBuilder, FormGroup } from '@angular/forms';
import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root'
})
export class LocationService {

  private position: BehaviorSubject<Position> = new BehaviorSubject(null);
  public readonly position$: Observable<Position> = this.position.asObservable();

  constructor(
    private fb: FormBuilder,
    private http: HttpClient,
  ) { }

  public getSuggestions(query: string): Observable<Suggestion[]> {
    const pos = this.getCurrentPosition();
    const options = `beginHighlight=<b>&endHighlight=</b>&prox=${pos.lat},${pos.lng},100000`;
    const url = `${environment.hereDevelopper.suggestionAPIURL}?query=${query}&${options}&apiKey=${environment.hereDevelopper.key}`;

    return Observable.create(observer => {
      fetch(url)
        .then(response => response.json())
        .then(suggestions => {
          observer.next(suggestions.suggestions);
          observer.complete();
        })
        .catch(err => observer.error(err));
    });
  }

  public getLocationDetails(suggestion: Suggestion): Observable<Location> {
    const params = `locationid=${suggestion.locationId}&jsonattributes=1&gen=9`;
    const url = `${environment.hereDevelopper.locationDetailsAPIURL}?${params}&apiKey=${environment.hereDevelopper.key}`;

    return Observable.create(observer => {
      fetch(url)
        .then(response => response.json())
        .then(response => this.locationDetailsResponseToLocation(response.response))
        .then(location => {
          observer.next(location);
          observer.complete();
        })
        .catch(err => observer.error(err));
    });
  }

  public getPositon(): Observable<Position> {
    return Observable.create(observer => {
      if (window.navigator && window.navigator.geolocation) {
        window.navigator.geolocation.getCurrentPosition(
          (position) => {
            const pos = new Position(position.coords.latitude, position.coords.longitude);
            this.setPosition(pos);
            observer.next(pos);
            observer.complete();
          },
          (error) => observer.error(error)
        );
      } else {
        observer.error('Unsupported Browser');
      }
    });
  }

  public setPosition(position: Position): void {
    this.position.next(position);
  }

  public getCurrentPosition(): Position {
    return this.position.value;
  }

  public createLocationForm(location?: Location): FormGroup {
    return this.fb.group({
      name: [location ? location.name : null],
      city: [location ? location.city : null],
      postalCode: [location ? location.postalCode : null],
      address: [location ? location.address : null],
      lat: [location ? location.lat : null],
      lng: [location ? location.lng : null]
    }, { validators: locationValidator });
  }

  private locationDetailsResponseToLocation(response: LocationDetailsResponse): Location {
    const locationDetails = response.view[0].result[0].location;
    return new Location(null, locationDetails.address.city, +locationDetails.address.postalCode, locationDetails.address.label, locationDetails.displayPosition.latitude, locationDetails.displayPosition.longitude);
  }
}
