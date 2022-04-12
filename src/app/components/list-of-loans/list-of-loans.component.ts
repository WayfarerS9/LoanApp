import { Component, OnInit } from '@angular/core';
import { GetInformationService } from '../../services/get-information.service'
import { Loan } from '../../interfaces/loan';

@Component({
    selector: 'app-list-of-loans',
    templateUrl: './list-of-loans.component.html',
    styleUrls: ['./list-of-loans.component.css']
})
export class ListOfLoansComponent implements OnInit {

    creditors: Loan[] = [];
    debtors: Loan[] = [];
    displayedColumns: string[] = ['name', 'amount', 'date', 'foot'];
    debitSumm: number = 0;
    creditSumm: number = 0;
    balanceSumm = 0;

    constructor(
        private getInformationService: GetInformationService,
    ) { }

    ngOnInit(): void {
        this.getCreditors();
        this.getDebtors();
        this.getBalanceSumm();
    }

    private getCreditors(): void {
        this.getInformationService.getCreditors()
            .subscribe(result => {
                this.creditors = result;

                for(let res of result) {
                    this.creditSumm += +res.amount;
                }
            });
    }

    private getDebtors(): void {
        this.getInformationService.getDebtors()
            .subscribe(result => {
                this.debtors = result;

                for(let res of result) {
                    this.debitSumm += +res.amount;
                }
            });
    }

    private getBalanceSumm(): void {
        this.getInformationService.getBalanceSumm()
            .subscribe(result => this.balanceSumm = result);

    }
}
