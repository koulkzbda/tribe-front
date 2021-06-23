import { startWith, debounceTime, distinctUntilChanged, switchMap } from 'rxjs/operators';
import { LocationService } from './../../../../core/services/location.service';
import { FormGroup, AbstractControl } from '@angular/forms';
import { Position, Suggestion } from './../../../../shared/models/location';
import { Subscription, Observable, of } from 'rxjs';
import { Component, OnInit, OnDestroy, Input, Output, EventEmitter } from '@angular/core';

@Component({
  selector: 'app-location-form',
  templateUrl: './location-form.component.html',
  styleUrls: ['./location-form.component.scss']
})
export class LocationFormComponent implements OnInit, OnDestroy {

  @Input() locationForm: FormGroup;
  @Output() locationChanged = new EventEmitter<boolean>();

  public position: Position;
  private posSub: Subscription;
  private detailsSub: Subscription;
  public suggestions: Observable<Suggestion[]>;

  constructor(private locationService: LocationService) { }

  get name(): AbstractControl { return this.locationForm?.get('name'); }
  get city(): AbstractControl { return this.locationForm?.get('city'); }
  get postalCode(): AbstractControl { return this.locationForm?.get('postalCode'); }
  get address(): AbstractControl { return this.locationForm?.get('address'); }
  get lat(): AbstractControl { return this.locationForm?.get('lat'); }
  get lng(): AbstractControl { return this.locationForm?.get('lng'); }

  ngOnInit(): void {
    this.getPosition();
    this.updatesuggestions();
  }

  ngOnDestroy(): void {
    if (this.posSub) this.posSub.unsubscribe();
    if (this.detailsSub) this.detailsSub.unsubscribe();
  }

  public updateLocation(suggestion: Suggestion) {
    this.detailsSub = this.locationService.getLocationDetails(suggestion).subscribe(
      location => {
        this.locationForm.patchValue({
          city: location.city,
          postalCode: location.postalCode,
          address: location.address,
          lat: location.lat,
          lng: location.lng
        });
      }
    )
  }

  public onLocationInput(): void {
    this.locationChanged.emit(true);
    if (this.locationForm.hasError('metricNameRequired'))
      this.name.setErrors([{ 'metricNameRequired': true }]);
    else
      this.name.setErrors(null);
  }

  public removeHTML(address: string): string {
    address = address.split('<b>').join('');
    address = address.split('</b>').join('');

    return address;
  }

  private updatesuggestions(): void {
    this.suggestions = this.address.valueChanges.pipe(
      startWith(''),
      debounceTime(400),
      distinctUntilChanged(),
      switchMap(query => this.filterSuggestion(query || ''))
    );
  }

  private filterSuggestion(query: string): Observable<Suggestion[]> {
    if (query.length > 6) {
      return this.locationService.getSuggestions(query);
    }

    return of([]);
  }

  private getPosition(): void {
    this.posSub = this.locationService.getPositon().subscribe(position => {
      this.position = position;
    });
  }

}
