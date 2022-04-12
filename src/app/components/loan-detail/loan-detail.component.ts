import { Component, OnInit } from '@angular/core';
import { GetInformationService } from '../../services/get-information.service';
import { ActivatedRoute } from '@angular/router';
import { Location } from '@angular/common';
import { Router } from '@angular/router';
import { Loan } from '../../interfaces/loan';

@Component({
    selector: 'app-loan-detail',
    templateUrl: './loan-detail.component.html',
    styleUrls: ['./loan-detail.component.css']
})
export class LoanDetailComponent implements OnInit {

    loan: Loan = {
        loanID: null,
        creditorID: null,
        creditorData: 'loading',
        debtorID: null,
        debtorData: 'loading',
        amount: 0,
        date: 'loading',
        foot: 'loading',
        addInf: 'loading',
    }

    constructor(
        private getInformationService: GetInformationService,
        private route: ActivatedRoute,
        private location: Location,
    ) { }

    ngOnInit(): void {
        this.getLoan();
    }

    getLoan(): void {
        const id = Number(this.route.snapshot.paramMap.get('id'));
        this.getInformationService.getLoan(id)
            .subscribe(loan => this.loan = loan);
    }

    goBack(): void {
        this.location.back();
    }
}
