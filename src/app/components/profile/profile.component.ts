import { Component, OnInit } from '@angular/core';
import { GetInformationService } from '../../services/get-information.service';
import { AddInformationService } from '../../services/add-information.service';
import { ActivatedRoute } from '@angular/router';
import { Location } from '@angular/common';
import { User } from '../../interfaces/user';
import { Router } from '@angular/router';

@Component({
    selector: 'app-profile',
    templateUrl: './profile.component.html',
    styleUrls: ['./profile.component.css']
})
export class ProfileComponent implements OnInit {

    user: User = {
        id: null,
        name: '...loading...',
        secondName: '...loading...',
        telNum: '...loading...',
        ghost: null
    };

    constructor(
        private route: ActivatedRoute,
        private getInformationService: GetInformationService,
        private addInformationService: AddInformationService,
        private location: Location,
        private router: Router,
    ) { }

    ngOnInit(): void {
        this.getUser();
    }

    getUser(): void {
        const id = Number(this.route.snapshot.paramMap.get('id'));
        this.getInformationService.getUser(id)
            .subscribe(user => this.user = user);
    }

    goBack(): void {
        this.location.back();
    }

    goToListOfSettlements(): void {
        this.router.navigate([`loansContact/${this.user.id}`]);
    }

}
