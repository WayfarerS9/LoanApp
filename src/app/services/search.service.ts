import { Injectable } from '@angular/core';
import { User } from '../interfaces/user';
import { Observable, of } from 'rxjs';
import { HttpParams, HttpClient, HttpHeaders } from '@angular/common/http';

@Injectable({
  providedIn: 'root'
})
export class SearchService {

    constructor(private http: HttpClient) { }

    searchUsers(term: string): Observable<User[]> {

        return this.http.get<User[]>(`http://localhost:3000/usersSearch/${term}`);
    }
}
