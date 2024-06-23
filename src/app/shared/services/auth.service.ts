import { Injectable, OnDestroy } from '@angular/core';
import { BehaviorSubject } from 'rxjs';
import { LocalStorageService } from './local-storage.service';

export interface IUserInfo {
  username: string;
  password: string;
  token: string | null;
}

@Injectable({
  providedIn: 'root'
})
export class AuthService implements OnDestroy{
  private readonly localStorageKeyName: string = "userInfo";
  private userInfoSubject: BehaviorSubject<IUserInfo> = new BehaviorSubject<IUserInfo>(this.localStorageService.getLocalStorage<IUserInfo>(this.localStorageKeyName));

  constructor(private localStorageService: LocalStorageService) { }

  ngOnDestroy(): void {
    if (this.userInfoSubject)
      this.userInfoSubject.unsubscribe();
  }

  private updateData(userInfo?: IUserInfo): boolean {
    if (userInfo) {
      this.localStorageService.updateLocalStorage(this.localStorageKeyName, userInfo);
      this.userInfoSubject.next(userInfo);
      return true;
    }
    else {
      this.localStorageService.updateLocalStorage(this.localStorageKeyName, null);
      this.userInfoSubject.next({ username: '', password: '', token: null });
      return false;
    }
  }

  private getUserInfoFromLocalStorage(): IUserInfo {
    return this.localStorageService.getLocalStorage<IUserInfo>(this.localStorageKeyName);;
  }

  public getLoggedUserInfo(): IUserInfo {
    return this.getUserInfoFromLocalStorage();
  }

  public completeLogin(loginInfo: IUserInfo): boolean {
    return this.updateData(loginInfo);
  }

  public completeLogout(): boolean {
    return this.updateData();
  }
}
