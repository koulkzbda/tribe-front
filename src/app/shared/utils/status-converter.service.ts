import { RepetitionStatus } from './../../shared/models/enums';
import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root'
})
export class StatusConverterService {

  constructor() { }

  public repetitionStatusToBoolean(status: string): boolean | string {
    switch (status) {
      case RepetitionStatus.canceled:
        return false;
      case RepetitionStatus.toDo:
        return null;
      case RepetitionStatus.done:
        return true;
      case RepetitionStatus.notDone:
        return false;
      default:
        return status;
    }
  }

  public booleanToRepetitionStatus(bool: boolean): RepetitionStatus | boolean {
    switch (bool) {
      case false:
        return RepetitionStatus.canceled;
      case null:
        return RepetitionStatus.toDo;
      case true:
        return RepetitionStatus.done;
      default:
        return bool;
    }
  }
}
