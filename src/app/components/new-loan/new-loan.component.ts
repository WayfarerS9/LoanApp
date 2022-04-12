import { RegAuthService } from '../../services/reg-auth.service';
import { Component, OnInit } from '@angular/core';
import { User } from '../../interfaces/user';
import { Loan } from '../../interfaces/loan';
import { GetInformationService } from '../../services/get-information.service';
import { AddInformationService } from '../../services/add-information.service';

@Component({
    selector: 'app-new-loan',
    templateUrl: './new-loan.component.html',
    styleUrls: ['./new-loan.component.css']
})
export class NewLoanComponent implements OnInit {

    contacts: User[] = [];
    registeredUser!: User;

    constructor(
        private getInformationService: GetInformationService,
        private addInformationService: AddInformationService,
        private regAuthService: RegAuthService,
    ) { }

    ngOnInit(): void {
        this.getContacts();
        this.registeredUser = this.regAuthService.getInformationAboutUserFromToken();
    }

    private getContacts(): void {
        this.getInformationService.getContacts()
            .subscribe(result => this.contacts = result);
    }

    createLoan(creditor: string, debtor: string, amount: string, date: string, reason: string) {
        let textArea = document.querySelector('textarea');

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
            return alert('The debtor and the creditor cannot be the same. Please check the correctness of the entered data.');
        }

        if(createdLoan.creditorID != this.registeredUser.id && createdLoan.debtorID != this.registeredUser.id) {
            return alert('You can create a loan only if you are the one of the parties to it');
        }

        if(!createdLoan.amount) {
            return alert('Please enter amount of credit.');
        }

        if(createdLoan.amount < 0) {
            return alert('Please enter amount of loan which will be more than 0.');
        }

        if(!createdLoan.date) {
            return alert('Enter the date of the loan');
        }

        if(createdLoan.foot.length < 5) {
            return alert('Information about the reason of the loan could not be less than 4 symbols.');
        }

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
