import { Picture } from './picture';
export class Profile {
  public readonly id: string;
  public bio: string;
  public profilePictures: Picture[];

  constructor(
    id: string,
    bio?: string,
    profilePictures?: Picture[]
  ) {
    this.id = id;
    this.bio = bio || '';
    this.profilePictures = profilePictures || [];
  }

}
