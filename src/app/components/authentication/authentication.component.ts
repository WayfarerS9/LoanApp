import { Component, OnInit } from '@angular/core';
import { RegAuthService } from '../../services/reg-auth.service';
import { Router } from '@angular/router';
import { User } from '../../interfaces/user';

@Component({
    selector: 'app-authentication',
    templateUrl: './authentication.component.html',
    styleUrls: ['./authentication.component.css']
})
export class AuthenticationComponent implements OnInit {

    constructor(private regAuthService: RegAuthService, private router: Router) { }

    ngOnInit(): void {
    }

    authUser(name: string, secondName: string, telNum: string) {
        this.regAuthService.authUser( {name, secondName, telNum} as User)
        .subscribe( (result) => {
            window.localStorage.setItem('auth_token', result.token);
            alert(result.message);
            this.router.navigate(['']);
        }, err => alert(err.message));
    }


}
