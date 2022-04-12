import { Injectable } from '@angular/core';
import { User } from '../interfaces/user';
import { Message } from '../interfaces/message';
import { Observable, of } from 'rxjs';
import { HttpClient } from '@angular/common/http';
import { Token } from '../interfaces/token';
import jwt_decode from 'jwt-decode';


@Injectable({
    providedIn: 'root'
})
export class RegAuthService {

    constructor(private http: HttpClient) { }

    regUser(user: User): Observable<Message> {
        return this.http.post<Message>('http://localhost:3000/reg', user)
    };

    regUserGhost(user: User): Observable<Message> {
        return this.http.post<Message>('http://localhost:3000/regGhost', user, {
            headers: {
                'authorization': window.localStorage['auth_token']
            }
        });
    };

    authUser( user: User): Observable<Message> {
        return this.http.post<Message>('http://localhost:3000/auth', user)
    }

    getInformationAboutUserFromToken() {
        let user: any = {};
        let decodedToken: Token | void = this.getDecodedAccessToken();
        if(decodedToken) {
            user.id = decodedToken.id;
            user.name = decodedToken.name;
            user.secondName = decodedToken.secondName;
            user.telNum = decodedToken.telNum;
            user.ghost = false;
        }
        return user;
    }

    getDecodedAccessToken(): Token | undefined {
        const token: string | null = window.localStorage.getItem('auth_token');
        let decodedToken: Token | undefined = undefined;

        if( token ) {
            return decodedToken = jwt_decode(token);
        } else {
            return undefined
        }
    }
}
