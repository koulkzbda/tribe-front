import { Picture } from './picture';

export class Profile {
  public readonly id: string;
  public bio: string;
  public profilePictures: Picture[];
  public readonly userId: string;

  constructor(
    id: string,
    bio?: string,
    profilePictures?: Picture[],
    userId?: string,
  ) {
    this.id = id;
    this.bio = bio || '';
    this.profilePictures = profilePictures || [];
    this.userId = userId;
  }

}
