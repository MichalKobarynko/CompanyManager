import { Injectable } from "@angular/core";
import { BehaviorSubject, Observable } from "rxjs";
import { FormStatus } from "../models/types";

@Injectable({
  providedIn: 'root'
})
export class LoadingSpinnerService {
  private show$ = new BehaviorSubject<boolean>(false);

  constructor() { }

  get getShow(): Observable<boolean> {
    return this.show$;
  }

  setSpinnerState(status: FormStatus) {
    if (status == FormStatus.Loading)
      this.show$.next(true);
    else
      this.show$.next(false);
  }
}
