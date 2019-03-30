import { Injectable } from '@angular/core';
import { HttpClient, HttpParams, HttpHeaders } from '@angular/common/http';
import { PageRequest, defaultPageRequest, Page, Caracter, Group } from '../model';
import { map } from 'rxjs/operators';
import { Observable } from 'rxjs';

interface Message<T> {
  success: boolean;
  message?: string;
  data?: T;
}

const apiUrl = '/api';
const caracterUrl = `${apiUrl}/caracter`;
const groupUrl = `${apiUrl}/group`;
const httpOptions = {
  headers: new HttpHeaders({
    'Content-Type': 'application/json',
  })
};

@Injectable({
  providedIn: 'root'
})
export class ApiService {

  constructor(
    private http: HttpClient,
  ) { }

  saveCaracter(c: Caracter): Observable<Caracter> {
    return this.http.post<Message<Caracter>>(caracterUrl, c, httpOptions).pipe(
      map(msg => msg.data),
    );
  }

  getCaracter(id: string): Observable<Caracter> {
    return this.http.get<Message<Caracter>>(`${caracterUrl}/${id}`).pipe(
      map(msg => msg.data),
    );
  }

  updateCaracter(caracter: Caracter): Observable<Caracter> {
    return this.http.put<Message<Caracter>>(
      `${caracterUrl}/${caracter._id}`,
      caracter,
      httpOptions).pipe(
        map(msg => msg.data),
      );
  }

  deleteCaracter(id: string): Observable<void> {
    return this.http.delete<void>(`${caracterUrl}/${id}`);
  }

  getCaracterPage({
    filter = defaultPageRequest.filter,
    pageOffset = defaultPageRequest.pageOffset,
    pageSize = defaultPageRequest.pageSize,
    sortBy = defaultPageRequest.sortBy,
    sortOrder = defaultPageRequest.sortOrder }: PageRequest = defaultPageRequest)
    : Observable<Page<Caracter>> {

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

    return this.http.get<Message<Page<Caracter>>>(`${apiUrl}/caracter`, {
      params,
    }).pipe(
      map(msg => msg.data),
    );

  }

  saveGroup(group: Group): Observable<Group> {
    const members = group.members.map(c => c._id);
    const msg = {
      name: group.name,
      members,
    }
    return this.http.post<Message<Group>>(groupUrl, msg, httpOptions).pipe(
      map(msg => msg.data),
    );
  }

  getGroup(id: string): Observable<Group> {
    return this.http.get<Message<Group>>(`${groupUrl}/${id}`).pipe(
      map(msg => msg.data),
    );
  }

  updateGroup(group:Group):Observable<Group>{
    return this.http.put<Message<Group>>(`${groupUrl}/${group._id}`,group, httpOptions).pipe(
      map(msg=>msg.data),
    );
  }

  deleteGroup(id: string): Observable<void> {
    return this.http.delete<void>(`${groupUrl}/${id}`);
  }

  getGroupPage({
    filter = defaultPageRequest.filter,
    pageOffset = defaultPageRequest.pageOffset,
    pageSize = defaultPageRequest.pageSize,
    sortBy = defaultPageRequest.sortBy,
    sortOrder = defaultPageRequest.sortOrder }: PageRequest = defaultPageRequest)
    :Observable<Page<Group>> {
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
  
      return this.http.get<Message<Page<Group>>>(`${apiUrl}/group`, {
        params,
      }).pipe(
        map(msg => msg.data),
      );
  
  }

}
