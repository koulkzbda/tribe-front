import { Picture } from './picture';

export abstract class Profile {
  public readonly id: string;
  public bio: string;
  public profilePictures: Picture[];

  constructor(
    id: string,
    bio?: string,
    profilePictures?: Picture[],
  ) {
    this.id = id;
    this.bio = bio || '';
    this.profilePictures = profilePictures || [];
  }
}

export class MemberProfile extends Profile {
  public readonly userId: string;

  constructor(
    id: string,
    bio?: string,
    profilePictures?: Picture[],
    userId?: string,
  ) {
    super(id, bio, profilePictures);
    this.userId = userId;
  }

}

export class TribeProfile extends Profile {
  public readonly tribeId: string;

  constructor(
    id: string,
    bio?: string,
    profilePictures?: Picture[],
    tribeId?: string,
  ) {
    super(id, bio, profilePictures);
    this.tribeId = tribeId;
  }

}
