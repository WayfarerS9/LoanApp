import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { ActivatedRoute } from '@angular/router';
import { GetInformationService } from '../../services/get-information.service';
import { Location } from '@angular/common';
import { Loan } from '../../interfaces/loan';

@Component({
    selector: 'app-loans-of-contact',
    templateUrl: './loans-of-contact.component.html',
    styleUrls: ['./loans-of-contact.component.css']
})
export class LoansOfContactComponent implements OnInit {

    debtLoans: Loan[] = [];
    creditLoans: Loan[] = [];
    displayedColumns: string[] = ['name', 'amount', 'date', 'foot'];
    debitSumm: number = 0;
    creditSumm: number = 0;
    balanceSumm = 0;

    constructor(
        private route: ActivatedRoute,
        private getInformationService: GetInformationService,
        private location: Location,
        private router: Router,
    ) { }

    ngOnInit(): void {
        this.getDebtLoans();
        this.getCreditLoans();
        this.getBalanceSumm();
    }

    getDebtLoans(): void {
        const id = Number(this.route.snapshot.paramMap.get('id'));
        this.getInformationService.getDebtLoansOfContact(id)
            .subscribe(result => {
                this.debtLoans = result;

                for(let res of result) {
                    this.creditSumm += +res.amount;
                }
            })
    }

    getCreditLoans(): void {
        const id = Number(this.route.snapshot.paramMap.get('id'));
        this.getInformationService.getCreditLoansOfContact(id)
            .subscribe(result => {
                this.creditLoans = result;

                for(let res of result) {
                    this.debitSumm += +res.amount;
                }
            })
    }

    private getBalanceSumm(): void {
        const id = Number(this.route.snapshot.paramMap.get('id'));
        this.getInformationService.getBalanceOfContact(id)
            .subscribe(result => this.balanceSumm = result);
    }

    goBack(): void {
        this.location.back();
    }
}
