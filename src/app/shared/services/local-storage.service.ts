import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root'
})
export class LocalStorageService {
  public updateLocalStorage(localStorageKeyName: string, data: object | null | undefined): void {
    if (typeof localStorage == 'undefined')
      return;
    localStorage.setItem(localStorageKeyName, JSON.stringify(data || ''));
  }

  public listLocalStorage<T>(localStorageKeyName: string): Array<T> {
    if (typeof localStorage == 'undefined')
      return new Array<T>();
    const storage: string | null = localStorage.getItem(localStorageKeyName);
    if (!storage)
      return new Array<T>();
    return JSON.parse(localStorage.getItem(localStorageKeyName) || '') as Array<T>;
  }

  public getLocalStorage<T>(localStorageKeyName: string): T {
    if (typeof localStorage == 'undefined')
      return {} as T;
    const storage: string | null = localStorage.getItem(localStorageKeyName);
    if (!storage)
      return {} as T;
    return JSON.parse(localStorage.getItem(localStorageKeyName) || '') as T;
  }
}
