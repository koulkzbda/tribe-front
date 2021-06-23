import { TranslationService } from './../../../../core/services/translation.service';
import { SystemService } from './../../../../core/services/system.service';
import { IdentityService } from './../../../../core/services/identity.service';
import { Identity } from 'src/app/shared/models/identity';
import { Subscription } from 'rxjs';
import { FormBuilder, FormGroup, Validators, FormArray, AbstractControl, FormControl } from '@angular/forms';
import { Component, OnInit, Output, EventEmitter, OnDestroy } from '@angular/core';

@Component({
  selector: 'app-create-system',
  templateUrl: './create-system.component.html',
  styleUrls: ['./create-system.component.scss']
})
export class CreateSystemComponent implements OnInit, OnDestroy {

  @Output() systemNameSubmitted = new EventEmitter<string>();
  public systemForm: FormGroup;
  public possibleIdentities: Identity[];
  private idSub: Subscription;
  private submitSub: Subscription;
  private submittedIdSub: Subscription;

  constructor(
    private identityService: IdentityService,
    private systemService: SystemService,
    private fb: FormBuilder,
    public translationService: TranslationService
  ) { }

  get identities(): FormArray { return this.systemForm.get('identities') as FormArray; }
  get name(): AbstractControl { return this.systemForm.get('name'); }

  get possibleCategories(): string[] {
    return [...new Set(
      this.identityService.identitiesToCategories(this.identities.value)?.map(cat => this.translationService.translateIdentityCategory(cat))
    )];
  }

  ngOnInit(): void {
    this.getIdentities();
    this.initForm();
  }

  ngOnDestroy(): void {
    if (this.idSub) this.idSub.unsubscribe();
    if (this.submitSub) this.submitSub.unsubscribe();
    if (this.submittedIdSub) this.submittedIdSub.unsubscribe();
  }

  public submit(): void {
    this.systemService.createSystem(this.systemForm.value).subscribe(
      s => {
        this.systemNameSubmitted.emit(s.name);
        this.systemForm.markAsUntouched();
      });

  }


  private getIdentities(): void {
    this.idSub = this.identityService.identities$.subscribe(
      id => this.possibleIdentities = id);
  }

  private initForm(): void {
    this.systemForm = this.fb.group({
      name: [null, [Validators.required]],
      identities: new FormControl(null, [Validators.required])
    });
  }

}
