import { ClearDebtsComponent } from './components/clear-debts/clear-debts.component';
import { LoanDetailComponent } from './components/loan-detail/loan-detail.component';
import { LoansOfContactComponent } from './components/loans-of-contact/loans-of-contact.component';
import { ListOfLoansComponent } from './components/list-of-loans/list-of-loans.component';
import { RegGhostProfileComponent } from './components/reg-ghost-profile/reg-ghost-profile.component';
import { ProfileComponent } from './components/profile/profile.component';
import { SearchingComponent } from './components/searching/searching.component';
import { RepaymentComponent } from './components/repayment/repayment.component';
import { NewLoanComponent } from './components/new-loan/new-loan.component';
import { ContactsComponent } from './components/contacts/contacts.component';
import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { RegistrationComponent } from './components/registration/registration.component';
import { AuthenticationComponent } from './components/authentication/authentication.component';

import { CommonGuard } from './guards/common.guard';


const routes: Routes = [
    { path: 'reg', component: RegistrationComponent },
    { path: 'auth', component: AuthenticationComponent },
    { path: 'contacts', component: ContactsComponent, canActivate: [CommonGuard] },
    { path: 'loanList', component: ListOfLoansComponent, canActivate: [CommonGuard] },
    { path: 'loansContact/:id', component: LoansOfContactComponent, canActivate: [CommonGuard] },
    { path: 'newLoan', component: NewLoanComponent, canActivate: [CommonGuard] },
    { path: 'repayment', component: RepaymentComponent, canActivate: [CommonGuard] },
    { path: 'searching', component: SearchingComponent, canActivate: [CommonGuard] },
    { path: 'regGhost', component: RegGhostProfileComponent, canActivate: [CommonGuard] },
    { path: 'profile/:id', component: ProfileComponent, canActivate: [CommonGuard] },
    { path: 'loan/:id', component: LoanDetailComponent, canActivate: [CommonGuard] },
    { path: 'commonDebts', component: ClearDebtsComponent, canActivate: [CommonGuard] },
    { path: '', redirectTo: '/contacts', pathMatch: 'full' },
];

@NgModule({
    imports: [RouterModule.forRoot(routes)],
    exports: [RouterModule]
})
export class AppRoutingModule { }
