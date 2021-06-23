import { RandomService } from './../../../../shared/utils/random.service';
import { Identity } from 'src/app/shared/models/identity';
import { IdentityCategory } from './../../../../shared/models/identity';
import { FormGroup, FormBuilder, FormArray, Validators, AbstractControl } from '@angular/forms';
import { Subscription } from 'rxjs';
import { TranslationService } from './../../../../core/services/translation.service';
import { IdentityService } from './../../../../core/services/identity.service';
import { Component, OnInit, OnDestroy, Output, EventEmitter } from '@angular/core';

@Component({
  selector: 'app-identity-list',
  templateUrl: './identity-list.component.html',
  styleUrls: ['./identity-list.component.scss']
})
export class IdentityListComponent implements OnInit, OnDestroy {

  @Output() isFormSubmitted = new EventEmitter<boolean>();
  @Output() isFormValid = new EventEmitter<boolean>();
  public identityCategories: IdentityCategory[];
  private categorySub: Subscription;
  private submitSub: Subscription;
  public identitiesForm: FormGroup;
  public submittedIdentities: Identity[];
  private submittedIdSub: Subscription;

  constructor(
    private identityService: IdentityService,
    private fb: FormBuilder,
    private randomService: RandomService,
    public translationService: TranslationService,
  ) { }

  get identities(): FormArray { return this.identitiesForm.get('identities') as FormArray; }

  public weightings(identityIndex: number): FormArray {
    return this.identities?.at(identityIndex).get('weightings') as FormArray
  }

  public category(identityIndex: number, weightingIndex: number): string {
    return this.weightings(identityIndex)?.at(weightingIndex)?.get('identityCategory')?.value[this.translationService.getCurrentLang()];
  }

  public weight(identityIndex: number, weightingIndex: number): AbstractControl {
    return this.weightings(identityIndex)?.at(weightingIndex)?.get('weight') as AbstractControl;
  }

  ngOnInit(): void {
    this.getIdentityCategories();
  }

  ngOnDestroy(): void {
    if (this.categorySub) this.categorySub.unsubscribe();
    if (this.submitSub) this.submitSub.unsubscribe();
    if (this.submittedIdSub) this.submittedIdSub.unsubscribe();
  }

  public submit(): void {
    this.submitSub = this.identityService.updateIdentities(this.identitiesForm.value).subscribe(_ => this.identitiesForm.markAsUntouched());
    this.isFormSubmitted.emit(true);
    this.getSubmittedIdentities();
  }

  public updateIsFormValid(): void {
    this.isFormValid.emit(this.identitiesForm.valid);
  }

  public getRemainingCategories(identityIndex: number): IdentityCategory[] {
    const existingCategories = new Array(this.weightings(identityIndex).length).fill(0)
      .map((v, index) => this.weightings(identityIndex).at(index).get('identityCategory').value);
    return this.identityCategories.filter(x => !existingCategories.includes(x));
  }

  public addCategory(identityIndex: number, ic: IdentityCategory): void {
    const categoryForm = this.fb.group({
      identityCategory: ic,
      weight: [0, [Validators.min(0.1)]]
    });
    this.weightings(identityIndex).push(categoryForm);
  }

  public getIdenityCategoryTranslation(ic: IdentityCategory): string {
    return ic[this.translationService.getCurrentLang()];
  }

  public addIdentity(): void {
    this.identities.push(this.createIdentityForm());
  }

  public deleteIdentity(identityIndex: number): void {
    this.identities.removeAt(identityIndex);
  }

  public deleteCategory(identityIndex: number, categoryIndex: number): void {
    this.weightings(identityIndex).removeAt(categoryIndex);
  }

  public canDeleteCategory(identityIndex: number): boolean {
    return this.weightings(identityIndex).length > 1;
  }

  public canDeleteIdentity(): boolean {
    return this.identities.length > 1;
  }

  public resetForm(): void {
    if (this.submittedIdentities) {
      this.identitiesForm.patchValue(
        {
          identities: this.submittedIdentities
        }
      );
      this.identitiesForm.markAsUntouched();
    }
  }

  public formatLabel(value: number): string {
    return value * 100 + '%';
  }

  private getIdentityCategories(): void {
    this.categorySub = this.identityService.getIdentityCategories().subscribe(
      cat => {
        this.identityCategories = cat;
        this.initForm();
      }
    );
  }

  private initForm(): void {
    this.identitiesForm = this.fb.group({
      identities: this.fb.array([this.createIdentityForm()], [Validators.required])
    });
  }

  private createIdentityForm(): FormGroup {
    return this.fb.group({
      name: [null, [Validators.required]],
      votes: 0,
      weightings: this.createWeightingForm()
    });
  }

  private createWeightingForm(): FormArray {
    return this.fb.array(
      this.randomService.getRandomIndicesInArray(this.identityCategories, 3)
        .map(ic => {
          return this.fb.group({
            identityCategory: ic,
            weight: [0, [Validators.min(0.1)]]
          });
        }, [Validators.required]));
  }

  private getSubmittedIdentities(): void {
    this.submittedIdSub = this.identityService.identities$.subscribe(id => this.submittedIdentities = id);
  }

}
