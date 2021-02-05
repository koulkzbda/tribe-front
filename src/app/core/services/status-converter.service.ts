import { RepetitionStatus } from './../../shared/models/enums';
import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root'
})
export class StatusConverterService {

  constructor() { }

  public repetitionStatusToBoolean(status: string): boolean {
    switch (status) {
      case RepetitionStatus.canceled:
        return false;
      case RepetitionStatus.toDo:
        return null;
      case RepetitionStatus.done:
        return true;
      case RepetitionStatus.notDone:
        return false;
    }
  }

  public booleanToRepetitionStatus(bool: boolean): RepetitionStatus {
    switch (bool) {
      case false:
        return RepetitionStatus.canceled;
      case null:
        return RepetitionStatus.toDo;
      case true:
        return RepetitionStatus.done;
    }
  }
}
