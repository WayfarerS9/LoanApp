import { Component, OnInit } from '@angular/core';
import { RegAuthService } from '../../services/reg-auth.service';
import { Router } from '@angular/router';
import { User } from '../../interfaces/user';
import { Location } from '@angular/common';

@Component({
    selector: 'app-reg-ghost-profile',
    templateUrl: './reg-ghost-profile.component.html',
    styleUrls: ['./reg-ghost-profile.component.css']
})
export class RegGhostProfileComponent implements OnInit {

    constructor(private regAuthService: RegAuthService, private router: Router, private location: Location) { }

    ngOnInit(): void {
    }

    regUserGhost(name: string, secondName: string, telNum: string){
        const ghost = true;
        this.regAuthService.regUserGhost( {name, secondName, telNum, ghost} as User)
            .subscribe( (result) => {
                alert(result.message);
                this.goBack();
            }, err => alert(err.message));
    }

    goBack(): void {
        this.location.back();
    }
}
