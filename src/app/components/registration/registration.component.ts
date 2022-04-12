import { Component, OnInit } from '@angular/core';
import { RegAuthService } from '../../services/reg-auth.service';
import { Router } from '@angular/router';
import { User } from '../../interfaces/user';

@Component({
    selector: 'app-registration',
    templateUrl: './registration.component.html',
    styleUrls: ['./registration.component.css']
})
export class RegistrationComponent implements OnInit {

    constructor(private regAuthService: RegAuthService, private router: Router) { }

    ngOnInit(): void {
    }

    regUser(name: string, secondName: string, telNum: string){
        const ghost = false;
        telNum = "+375"+telNum;
        this.regAuthService.regUser( {name, secondName, telNum, ghost} as User)
            .subscribe( (result) => {
                alert(result.message);
                this.router.navigate(['auth']);
            }, err => alert(err.message));
    }
}
