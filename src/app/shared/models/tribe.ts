import { System } from './system';
import { TribeProfile } from './profile';
export class Tribe {
  constructor(
    public readonly id: string,
    public name: string,
    public description: string,
    public validated: boolean,
    public profile?: TribeProfile,
    public systems?: System[]
  ) { }
}
