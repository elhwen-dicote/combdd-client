import { Injectable } from '@angular/core';
import { ApiService } from './api.service';
import { DataCacheService } from './data-cache.service';
import { Observable, of } from 'rxjs';
import { Caracter, PageRequest, Page, Group } from '../model';
import { tap } from 'rxjs/operators';

@Injectable({
  providedIn: 'root'
})
export class DataService {

  constructor(
    private api: ApiService,
    private cache: DataCacheService
  ) { }

  saveCaracter(c: Caracter): Observable<Caracter> {
    return this.api.saveCaracter(c);
  }

  getCaracter(id: string): Observable<Caracter> {
    let result;
    const caracter = this.cache.getCaracter(id);
    if (caracter) {
      result = of(caracter);
    } else {
      result = this.api.getCaracter(id).pipe(
        tap(car => {
          this.cache.putCaracter(car);
        }),
      );
    }
    return result;
  }

  updateCaracter(car: Caracter): Observable<Caracter> {
    return this.api.updateCaracter(car).pipe(
      tap(car => {
        this.cache.putCaracter(car);
      }),
    );
  }

  getCaracterPage(request: PageRequest): Observable<Page<Caracter>> {
    let result: Observable<Page<Caracter>> = null;
    const key = request.buildIndex();
    const page = this.cache.getCaracterPage(key);
    if (page) {
      result = of(page);
    } else {
      result = this.api.getCaracterPage(request).pipe(
        tap((page) => {
          this.cache.putCaracterPage(key, page);
        }),
      );
    }
    return result;
  }

  deleteCaracter(id: string): Observable<void> {
    return this.api.deleteCaracter(id);
  }

  saveGroup(group: Group): Observable<Group> {
    return this.api.saveGroup(group).pipe(
      tap(group => {
        this.cache.savedGroup(group);
      }),
    );
  }

  getGroup(id: string): Observable<Group> {
    let result;
    const group = this.cache.getGroup(id);
    if (group) {
      result = of(group);
    } else {
      result = this.api.getGroup(id).pipe(
        tap(group => {
          this.cache.putGroup(group);
        }),
      );
    }
    return result;
  }

  updateGroup(group:Group):Observable<Group> {
    return this.api.updateGroup(group).pipe(
      tap(group=>{
        this.cache.putGroup(group);
      }),
    );
  }

  getGroupPage(request: PageRequest): Observable<Page<Group>> {
    let result: Observable<Page<Group>> = null;
    const key = request.buildIndex();
    const page = this.cache.getGroupPage(key);
    if (page) {
      result = of(page);
    } else {
      result = this.api.getGroupPage(request).pipe(
        tap((page) => {
          this.cache.putGroupPage(key, page);
        }),
      );
    }
    return result;
  }

  deleteGroup(id: string): Observable<void> {
    return this.api.deleteGroup(id).pipe(
      tap(() => {
        this.cache.deleteGroup(id);
      })
    );
  }

  invalidateCache() {
    this.cache.invalidate();
  }

}
