export class Profile {
  public bio: string;

  constructor(
    bio?: string
  ) {
    this.bio = bio || '';
  }
}
