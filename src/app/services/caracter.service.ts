import { Injectable } from '@angular/core';
import { HttpClient, HttpParams, HttpHeaders } from '@angular/common/http';
import { Observable, of } from 'rxjs';
import { CaracterPage, CaracterPageRequest } from '../model/caracter-page.model';
import { map, tap } from 'rxjs/operators';
import { LruCache } from '../util/lru-cache';
import { Caracter } from '../model/caracter.model';
import { CaracterPageCache } from './caracter-page-cache';

interface Message<T> {
  success: boolean;
  message?: string;
  data?: T;
}

const url = '/api/caracter';
const httpOptions = {
  headers: new HttpHeaders({
    'Content-Type': 'application/json',
  })
}

@Injectable({
  providedIn: 'root'
})
export class CaracterService {

  private caracterPageCache = new CaracterPageCache();

  constructor(
    private http: HttpClient,
  ) { }

  saveCaracter(c: Caracter): Observable<Caracter> {
    return this.http.post<Message<Caracter>>(url, c, httpOptions).pipe(
      map((msg) => {
        return msg.data;
      }),
    );
  }

  getCaracterPage(cpreq: CaracterPageRequest): Observable<CaracterPage> {
    let result: Observable<CaracterPage> = null;
    const key = cpreq.buildIndex();
    const page = this.caracterPageCache.getPage(key);
    if (page) {
      result = of(page);
    } else {
      return this.loadCaracterPageFromServer(cpreq, key);
    }
    return result;
  }

  invalidateCache() {
    this.caracterPageCache.invalidate();
  }

  deleteCaracter(id: string): Observable<void> {
    return this.http.delete<void>(`${url}/${id}`);
  }

  getCaracter(id: string): Observable<Caracter> {
    const caracter = this.caracterPageCache.getCaracter(id);
    return (caracter ? of(caracter) : this.loadCaracterFromServer(id));
  }

  updateCaracter(caracter: Caracter) {
    return this.http.put<Caracter>(`${url}/${caracter._id}`, caracter, httpOptions);
  }

  private loadCaracterPageFromServer(cpreq: CaracterPageRequest, key: string) {
    const {
      filter = '',
      pageOffset = 0,
      pageSize = 0,
      sortBy = '',
      sortOrder = 'asc' } = cpreq;

    let params = new HttpParams();
    if (filter) {
      params = params.set('filter', filter);
    }
    if (pageOffset) {
      params = params.set('pageOffset', pageOffset.toString());
    }
    if (pageSize) {
      params = params.set('pageSize', pageSize.toString());
    }
    if (sortBy) {
      params = params.set('sortBy', sortBy);
    }
    if (sortOrder) {
      params = params.set('sortOrder', sortOrder);
    }

    return this.http.get<Message<CaracterPage>>(url, {
      params,
    }).pipe(
      map((msg) => msg.data),
      tap((page) => {
        this.caracterPageCache.putPage(key, page);
      }),
    );
  }

  private loadCaracterFromServer(id: string): Observable<Caracter> {
    return this.http.get<Message<Caracter>>(`${url}/${id}`).pipe(
      map((msg) => {
        return msg.data;
      })
    );
  }

}
