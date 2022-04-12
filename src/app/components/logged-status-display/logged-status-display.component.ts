import { Component, OnInit } from '@angular/core';
import { Token } from '../../interfaces/token';
import { RegAuthService } from '../../services/reg-auth.service';

@Component({
    selector: 'app-logged-status-display',
    templateUrl: './logged-status-display.component.html',
    styleUrls: ['./logged-status-display.component.css']
})
export class LoggedStatusDisplayComponent implements OnInit {

    userName: string   = 'unknown';
    userSecondName: string  = 'unknown';
    decodedToken: Token | undefined = undefined;

    constructor(private regAuthService: RegAuthService) { }

    ngOnInit(): void {
        this.decodedToken = this.regAuthService.getDecodedAccessToken();
        if (this.decodedToken) {
            this.userName = this.decodedToken.name;
            this.userSecondName = this.decodedToken.secondName;
        }
    }
}
