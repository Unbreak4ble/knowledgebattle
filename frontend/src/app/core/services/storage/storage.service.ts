import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root'
})
export class StorageService {

  private storage: Storage;

  constructor() {
    this.storage = window.localStorage;
  }

  set(key:string, value:string){
    this.storage.setItem(key, value);
  }

  get(key:string){
    return this.storage.getItem(key);
  }

  listKeys(){
    return Object.keys(localStorage);
  }

  remove(key:string){
    this.storage.removeItem(key);
  }
}
