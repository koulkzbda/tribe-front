import { IdentityService } from './../../../../core/services/identity.service';
import { Identity } from 'src/app/shared/models/identity';
import { FormArray, FormGroup, AbstractControl } from '@angular/forms';
import { Component, OnInit, Input } from '@angular/core';

@Component({
  selector: 'app-identities-panel-form',
  templateUrl: './identities-panel-form.component.html',
  styleUrls: ['./identities-panel-form.component.scss']
})
export class IdentitiesPanelFormComponent implements OnInit {

  @Input() progression: FormGroup;
  @Input() identitiesControl: AbstractControl;
  @Input() identitiesPossible: Identity[];
  @Input() initialSelectedIdentities: Identity[];
  @Input() iconName: string;
  @Input() label: string;
  @Input() hint: string;
  public initialIdentities: Identity[];


  constructor(
    private identityService: IdentityService
  ) { }

  get identities(): AbstractControl { return this.progression.get("identities") as AbstractControl; }

  get identitiesArray(): FormArray {
    if (this.identities?.value) {
      return this.identityService.identitiesToFormArray(this.identities?.value);
    }
  }

  ngOnInit(): void {
    this.initialIdentities = this.identitiesPossible.slice();
  }

  public onIdentitiesUpdated(identities: Identity[]): void {
    const indexMapping = [];
    this.identitiesPossible.forEach((idPossible, index) => {
      if (identities.slice(indexMapping.length).find(id => id.id == idPossible.id || (!id.id && id.name == idPossible.name))) {
        indexMapping.push(index);
      }
    });
    indexMapping.forEach((identitiesPossibleIndex, identitiesIndex) => {
      this.identitiesPossible[identitiesPossibleIndex] = identities[identitiesIndex];
    });
    Array.prototype.push.apply(this.identitiesPossible, identities.slice(indexMapping.length));
    this.identities.setValue(identities);
  }

  public onResetIdentities(): void {
    this.identitiesPossible = this.initialIdentities.slice();
    this.identities.setValue(this.initialSelectedIdentities);
  }

  public compareByName(identity1: Identity, identity2: Identity): boolean {
    return identity1 && identity2 && identity1.name == identity2.name;
  }

}
