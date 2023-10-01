import { Injectable } from "@angular/core";
import { BehaviorSubject, Observable } from "rxjs";
import { Subject } from "rxjs/internal/Subject";
import { ToastType } from "../models/types";

@Injectable({
  providedIn: 'root'
})
export class ToastService {
  private message$ = new BehaviorSubject<string>('');
  private show$ = new BehaviorSubject<boolean>(false);
  private type$ = new BehaviorSubject<ToastType>('confirm');
  private timeout: any;

  get getMessage(): Observable<string> {
    return this.message$;
  }

  get getShow(): Observable<boolean> {
    return this.show$;
  }

  get getType(): Observable<ToastType> {
    return this.type$;
  }

  showToast(type: ToastType, message: string) {

    this.message$.next(message);
    this.type$.next(type);
    this.show$.next(true);
    
    if (this.timeout) {
      clearTimeout(this.timeout);
    }

    this.timeout = setTimeout(() => {
      this.closeToast();
    }, 5000);
  }

  closeToast() {
    this.show$.next(false);
  }
}


