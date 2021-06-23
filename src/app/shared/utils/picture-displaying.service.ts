import { Picture, Pictures } from './../../shared/models/picture';
import { PictureUrlInfo } from './../../shared/models/utils/picture-url-info';
import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root'
})
export class PictureDisplayingService {

  public srcPrefix = 'data:image/png;base64,';

  constructor() { }

  public detectFiles(pictures: File[]): PictureUrlInfo {
    const imgURLs = [];
    const imgNames = [];

    for (const file of pictures) {
      const reader = new FileReader();
      reader.readAsDataURL(file);
      reader.onload = (e: any) => {
        imgURLs.push(e.target.result);
        imgNames.push(file.name);
      };
    }

    return new PictureUrlInfo(imgURLs, imgNames);
  }

  public pictureListToPictures(pictures: Picture[], isEditable?: boolean): Pictures {
    const headlinePicture = this.getHeadlinePicture(pictures);

    const otherPicturess = pictures.some(picture => picture.isHeadlinePicture) ?
      pictures.filter(picture => !picture.isHeadlinePicture) : pictures.slice(1);

    return new Pictures(headlinePicture, otherPicturess, isEditable);
  }

  public getHeadlinePicture(pictures: Picture[]): Picture {
    return pictures.filter(picture => picture.isHeadlinePicture)[0] || pictures[0];
  }

}
