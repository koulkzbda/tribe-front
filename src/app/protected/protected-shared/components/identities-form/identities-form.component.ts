import { RandomService } from './../../../../shared/utils/random.service';
import { Identity } from 'src/app/shared/models/identity';
import { Subscription } from 'rxjs';
import { IdentityService } from './../../../../core/services/identity.service';
import { TranslationService } from './../../../../core/services/translation.service';
import { IdentityCategory } from './../../../../shared/models/identity';
import { Validators, FormGroup, FormArray, FormBuilder, AbstractControl } from '@angular/forms';
import { Component, OnInit, EventEmitter, Output, Input } from '@angular/core';

@Component({
  selector: 'app-identities-form',
  templateUrl: './identities-form.component.html',
  styleUrls: ['./identities-form.component.scss']
})
export class IdentitiesFormComponent implements OnInit {

  @Input() initialIdentities: Identity[];
  @Input() set identitiesArray(identities: FormArray) {

    if (identities.length <= 1) {
      if (!this.identities) {
        this.initForm(identities);
      }
    } else {
      identities?.value.filter(identity => !(this.identities?.value.some(id => id.id == identity.id || (!id.id && identity.name == id.name))))
        .forEach(ident => {
          this.identities?.push(this.identityService.createIdentityForm(ident));
        });
    }
  }
  @Output() identitiesUpdated = new EventEmitter<Identity[]>();
  @Output() resetIdentities = new EventEmitter<null>();
  public identityCategories: IdentityCategory[];
  private categorySub: Subscription;
  public identitiesForm: FormGroup;
  public submittedIdentities: Identity[];
  public formReset = false;
  private submittedIdSub: Subscription;
  private changeSub: Subscription;

  constructor(
    private identityService: IdentityService,
    private fb: FormBuilder,
    private randomService: RandomService,
    public translationService: TranslationService,
  ) { }

  get identities(): FormArray { return this.identitiesForm?.get('identities') as FormArray; }

  public weightings(identityIndex: number): FormArray {
    return this.identities?.at(identityIndex)?.get('weightings') as FormArray
  }

  public category(identityIndex: number, weightingIndex: number): string {
    const identityCategory = this.weightings(identityIndex)?.at(weightingIndex)?.get('identityCategory')?.value;
    return identityCategory ? identityCategory[this.translationService.getCurrentLang()] : null;
  }

  public weight(identityIndex: number, weightingIndex: number): AbstractControl {
    return this.weightings(identityIndex)?.at(weightingIndex)?.get('weight') as AbstractControl;
  }

  ngOnInit(): void {
    this.getIdentityCategories();
    this.getSubmittedIdentities();
  }

  ngOnDestroy(): void {
    if (this.categorySub) this.categorySub.unsubscribe();
    if (this.submittedIdSub) this.submittedIdSub.unsubscribe();
    if (this.changeSub) this.changeSub.unsubscribe();
  }

  public getRemainingCategories(identityIndex: number): IdentityCategory[] {
    const existingCategories = new Array(this.weightings(identityIndex).length).fill(0)
      .map((v, index) => this.weightings(identityIndex).at(index).get('identityCategory').value);
    return this.identityCategories?.filter(x => !existingCategories.includes(x));
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
    this.identitiesUpdated.emit(this.identities.value);
  }

  public deleteCategory(identityIndex: number, categoryIndex: number): void {
    this.weightings(identityIndex).removeAt(categoryIndex);
    this.identitiesUpdated.emit(this.identities.value);
  }

  public canDeleteCategory(identityIndex: number): boolean {
    return this.weightings(identityIndex).length > 1;
  }

  public canDeleteIdentity(): boolean {
    return this.identities.length > 1;
  }

  public resetForm(): void {
    const initialState = this.initialIdentities ? this.initialIdentities : this.submittedIdentities ? this.submittedIdentities : null;
    this.identities.reset();
    this.identities.clear();
    initialState.map(id => this.identityService.createIdentityForm(id)).forEach(identityForm => this.identities.push(identityForm));

    this.identitiesForm.markAsUntouched();
    this.resetIdentities.emit(null);
  }

  public formatLabel(value: number): string {
    return value * 100 + '%';
  }

  private getIdentityCategories(): void {
    this.categorySub = this.identityService.getIdentityCategories().subscribe(
      cat => {
        this.identityCategories = cat;
      }
    );
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

  public updateChanges(): void {
    if (JSON.stringify(this.initialIdentities) != JSON.stringify(this.identities.value) && !this.formReset) {
      this.identitiesUpdated.emit(this.identities.value);
    }
    this.formReset = false;
  }

  private initForm(identitiesArray: FormArray): void {
    this.identitiesForm = this.fb.group({
      identities: identitiesArray
    });
  }


}
