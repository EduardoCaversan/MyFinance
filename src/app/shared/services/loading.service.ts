import { Injectable } from '@angular/core';
import { BehaviorSubject, Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class LoadingService {
  private loadingSubject: BehaviorSubject<boolean> = new BehaviorSubject(false);

  constructor() { }

  public get getLoadingSubject(): BehaviorSubject<boolean> {
    return this.loadingSubject;
  }

  public show(): void {
    this.loadingSubject.next(true);
  }

  public hide(): void {
    var timeOut = setTimeout(() => {
      this.loadingSubject.next(false);
      clearTimeout(timeOut);
    },
      300
    );
  }

  public showForAMoment(timeInMiliSecond: number = 5000): void {
    this.show();
    setTimeout(() => this.hide(), timeInMiliSecond);
  }
}
