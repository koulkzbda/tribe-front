import { Picture } from './picture';
export class Profile {
  public readonly id: number;
  public bio: string;
  public profilePictures: Picture[];

  constructor(
    id: number,
    bio?: string,
    profilePictures?: Picture[]
  ) {
    this.id = id;
    this.bio = bio || '';
    this.profilePictures = profilePictures || [];
  }

}
