import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root'
})
export class TextParserService {

  constructor() { }

  public separateParagraphs(text: string): string[] {
    console.log(text)
    return text.split('\n');
  }
}
