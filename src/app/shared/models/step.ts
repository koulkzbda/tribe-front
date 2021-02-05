import { Location } from "./location";

export class Step {
  constructor(
    public readonly id: string,
    public description: string,
    public location: Location,
  ) { }
}
