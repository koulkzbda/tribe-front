import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root'
})
export class RandomService {

  constructor() { }

  public getRandomIndicesInArray(array: any[], nbIndices: number): any[] {
    var result = new Array(nbIndices),
      len = array.length,
      taken = new Array(len);
    if (nbIndices > len)
      throw new RangeError("getRandom: more elements taken than available");
    while (nbIndices--) {
      var x = Math.floor(Math.random() * len);
      result[nbIndices] = array[x in taken ? taken[x] : x];
      taken[x] = --len in taken ? taken[len] : len;
    }

    return result;
  }

}
