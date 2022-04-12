import { Injectable } from '@angular/core';
import { Observable} from 'rxjs';
import { User } from '../interfaces/user';
import { Loan } from '../interfaces/loan';
import { HttpClient } from '@angular/common/http';
import { RegAuthService } from './reg-auth.service';
import { catchError, map } from 'rxjs/operators';

@Injectable({
    providedIn: 'root'
})
export class GetInformationService {

    constructor(
        private http: HttpClient,
        private regAuthService: RegAuthService
    ) { }

    getUser(id: number): Observable<User> {
        return this.http.get<User>(`http://localhost:3000/user/${id}/`, {
            headers: {
                'authorization': window.localStorage['auth_token']
            }
        })
    };

    getLoan(id: number): Observable<Loan> {
        return this.http.get<Loan>(`http://localhost:3000/loan/${id}/`, {
            headers: {
                'authorization': window.localStorage['auth_token']
            }
        })
    };

    getContacts(): Observable<User[]> {
        return this.http.get<User[]>('http://localhost:3000/contacts/', {
            headers: {
                'authorization': window.localStorage['auth_token']
            }
        });
    }

    getCreditors():Observable<Loan[]> {
        return this.http.get<Loan[]>(`http://localhost:3000/creditors/`, {
            headers: {
                'authorization': window.localStorage['auth_token']
            }
        })
    }

    getDebtors():Observable<Loan[]> {
        return this.http.get<Loan[]>(`http://localhost:3000/debitors/`, {
            headers: {
                'authorization': window.localStorage['auth_token']
            }
        })
    }

    getCreditLoansOfContact(id: number): Observable<Loan[]> {
        return this.http.get<Loan[]>(`http://localhost:3000/creditLoans/${id}`, {
            headers: {
                'authorization': window.localStorage['auth_token']
            }
        })
    }

    getDebtLoansOfContact(id: number): Observable<Loan[]> {
        return this.http.get<Loan[]>(`http://localhost:3000/debtLoans/${id}`, {
            headers: {
                'authorization': window.localStorage['auth_token']
            }
        })
    }

    getBalanceSumm(): Observable<number> {
        return this.http.get<any>(`http://localhost:3000/balanceSumm`, {
            headers: {
                'authorization': window.localStorage['auth_token']
            }
        }).pipe(
            map( data => {
                return data.summOfbalance
            })
        )
    }

    getBalanceOfContact(id: number): Observable<number> {
        return this.http.get<any>(`http://localhost:3000/balanceSummOfContact/${id}`, {
            headers: {
                'authorization': window.localStorage['auth_token']
            }
        }).pipe(
            map( data => data.summOfbalance)
        )
    }


    getAllDebts(): Observable<any> {
        return this.http.get<any>(`http://localhost:3000/getAllDebts`, {
            headers: {
                'authorization': window.localStorage['auth_token']
            }
        })
    }



    
}
