import { FormArray, FormGroup, FormBuilder, Validators } from '@angular/forms';
import { tap } from 'rxjs/operators';
import { environment } from './../../../environments/environment';
import { Observable, BehaviorSubject } from 'rxjs';
import { Identity, IdentityCategory, Weighting } from './../../shared/models/identity';
import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root'
})
export class IdentityService {

  private identities: BehaviorSubject<Identity[] | null> = new BehaviorSubject(null);
  public readonly identities$: Observable<Identity[] | null> = this.identities.asObservable();

  private identityCategories: BehaviorSubject<IdentityCategory[] | null> = new BehaviorSubject(null);
  public readonly identityCategories$: Observable<IdentityCategory[] | null> = this.identityCategories.asObservable();

  constructor(
    private http: HttpClient,
    private fb: FormBuilder,
  ) { }

  public getIdentityCategories(): Observable<IdentityCategory[]> {
    const url = `${environment.backend.baseURL}/members/identities/categories`;

    return this.http.get<IdentityCategory[]>(url);
  }

  public updateIdentities(identities: any): Observable<Identity[]> {
    const url = `${environment.backend.baseURL}/members/identities`;

    return this.http.post<Identity[]>(url, identities).pipe(
      tap(id => this.setIdentities(id)),
      tap(id => this.setIdentityCategories(this.identitiesToCategories(id))),
    );
  }

  public setIdentities(identities: Identity[]): void {
    this.identities.next(identities);
  }

  public setIdentityCategories(identityCategories: IdentityCategory[]): void {
    this.identityCategories.next(identityCategories);
  }

  public identitiesToCategories(identities: Identity[]): IdentityCategory[] {
    if (identities?.length) {
      return identities?.map(
        id => id?.weightings.map(w => w?.identityCategory)
      ).reduce((acc, cur) => [...cur, ...acc]);
    }

    return null;
  }

  public identitiesToFormArray(identities: Identity[]): FormArray {
    return this.fb.array(
      identities?.map(
        identity => this.createIdentityForm(identity)
      )
    );
  }

  public identitiesToFormGroupArray(identities: Identity[]): FormGroup[] {
    return identities.map(
      identity => this.createIdentityForm(identity)
    );
  }

  public createIdentityForm(identity: Identity): FormGroup {
    return this.fb.group({
      id: identity.id,
      name: identity.name,
      votes: identity.votes,
      weightings: this.createWeightingForm(identity.weightings)
    });
  }

  private createWeightingForm(weightings: Weighting[]): FormArray {
    return this.fb.array(
      weightings
        .map(w => {
          return this.fb.group({
            identityCategory: w.identityCategory,
            weight: [w.weight, [Validators.min(0.1)]],
            id: w.id
          });
        }));
  }
}
