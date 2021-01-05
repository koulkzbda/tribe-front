export class PictureUrlInfo {
  public imgURLs: string[];
  public imgNames: string[];

  constructor(
    imgURLs: string[],
    imgNames: string[]
  ) {
    this.imgURLs = imgURLs;
    this.imgNames = imgNames;
  }
}
