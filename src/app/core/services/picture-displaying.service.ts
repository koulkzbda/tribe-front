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
}
