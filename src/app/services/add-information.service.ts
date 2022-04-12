import { Injectable } from '@angular/core';
import { Observable} from 'rxjs';
import { User } from '../interfaces/user';
import { Message } from '../interfaces/message';
import { HttpParams, HttpClient, HttpHeaders } from '@angular/common/http';
import { Loan } from '../interfaces/loan';

@Injectable({
    providedIn: 'root'
})
export class AddInformationService {

    constructor(private http: HttpClient) { }

    addToContacts(user: User): Observable<Message> {
        return this.http.post<Message>('http://localhost:3000/addToContacts', user, {
            headers: {
                'authorization': window.localStorage['auth_token']
            }
        });
    }

    createLoan(createdLoan: Loan): Observable<Message> {
        return this.http.post<Message>('http://localhost:3000/createLoan', createdLoan, {
            headers: {
                'authorization': window.localStorage['auth_token']
            }
        })
    }
}
