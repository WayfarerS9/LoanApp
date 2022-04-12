import { Component, OnInit } from '@angular/core';
import { GetInformationService } from '../../services/get-information.service';
import { User } from '../../interfaces/user';
import { RegAuthService } from '../../services/reg-auth.service';
import { Loan } from '../../interfaces/loan';
import { AddInformationService } from '../../services/add-information.service';

@Component({
    selector: 'app-repayment',
    templateUrl: './repayment.component.html',
    styleUrls: ['./repayment.component.css']
})
export class RepaymentComponent implements OnInit {

    contacts: User[] = [];
    registeredUser!: User;

    constructor(
        private getInformationService: GetInformationService,
        private regAuthService: RegAuthService,
        private addInformationService: AddInformationService,
    ) { }

    ngOnInit(): void {
        this.getContacts();
        this.registeredUser = this.regAuthService.getInformationAboutUserFromToken();
    }

    private getContacts(): void {
        this.getInformationService.getContacts()
            .subscribe(result => this.contacts = result);
    }

    createPayment(creditor: string, debtor: string, amount: string, date: string) {
        let textArea = document.querySelector('textarea');
        const reason = 'Debt repayment'

        let createdLoan: Loan | any = {
            loanID: null,
            creditorID: this.matchingUser(creditor),
            creditorData: creditor,
            debtorID: this.matchingUser(debtor),
            debtorData: debtor,
            amount: +amount,
            date: date,
            foot: reason,
            addInf: textArea?.value,
        }

        if(creditor == 'Me') {
            createdLoan.creditorData = `${this.registeredUser.name} ${this.registeredUser.secondName} ${this.registeredUser.telNum}`;
        }

        if(debtor == 'Me') {
            createdLoan.debtorData = `${this.registeredUser.name} ${this.registeredUser.secondName} ${this.registeredUser.telNum}`;
        }

        if(createdLoan.creditorID == createdLoan.debtorID) {
            return alert('The recipient and the payer cannot be the same. Please check the correctness of the entered data.');
        }

        if(createdLoan.creditorID != this.registeredUser.id && createdLoan.debtorID != this.registeredUser.id) {
            return alert('You can create a debt repayment only if you are the one of the parties to it');
        }

        if(!createdLoan.amount) {
            return alert('Please enter amount of repayment.');
        }

        if(createdLoan.amount < 0) {
            return alert('Please enter amount of repayment which will be more than 0.');
        }

        if(!createdLoan.date) {
            return alert('Enter the date of repayment');
        }

        createdLoan.amount = createdLoan.amount - 2*createdLoan.amount;

        this.addInformationService.createLoan(createdLoan)
        .subscribe( (result: any) => {
            alert(result.message);
        });
    }

    matchingUser(user: string): number | any {
        if (user === 'Me') {
            return this.registeredUser.id;
        } else {
            let usingForFindingString: string = user.split(' ')[2];

            for(let contact of this.contacts) {
                if(contact.telNum === usingForFindingString) {
                    return contact.id;
                };
            }
        }
    }

}
