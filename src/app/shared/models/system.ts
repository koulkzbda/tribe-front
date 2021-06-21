import { HabitStack } from './habit-stack';
import { Identity } from './identity';

export class System {
  constructor(
    public readonly id: string,
    public name: string,
    public identities?: Identity[],
    public habitStacks?: HabitStack[]
  ) { }
}
