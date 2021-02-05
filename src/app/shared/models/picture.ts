export class Picture {
  public readonly id: string;
  public imageName: string;
  public imageType: string;
  public imageFile: Blob;
  public createdAt: Date;
  public isHeadlinePicture: boolean;

  constructor(
    id: string,
    imageName?: string,
    imageType?: string,
    imageFile?: Blob,
    createdAt?: Date,
    isHeadlinePicture?: boolean,
  ) {
    this.id = id;
    this.imageName = imageName || '';
    this.imageType = imageType || '';
    this.imageFile = imageFile || null;
    this.createdAt = createdAt || null;
    this.isHeadlinePicture = isHeadlinePicture || false;
  }
}

export class Pictures {
  constructor(
    public headlinePicture?: Picture,
    public otherPictures?: Picture[]
  ) { }
}
