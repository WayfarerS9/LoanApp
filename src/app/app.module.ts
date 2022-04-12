import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { FormsModule } from '@angular/forms';
import { AppRoutingModule } from './app-routing.module';
import { HttpClientModule } from '@angular/common/http';
import { AppComponent } from './app.component';
import { AuthenticationComponent } from './components/authentication/authentication.component';
import { RegistrationComponent } from './components/registration/registration.component';
import { ContactsComponent } from './components/contacts/contacts.component';
import { SearchingComponent } from './components/searching/searching.component';
import { NewLoanComponent } from './components/new-loan/new-loan.component';
import { RepaymentComponent } from './components/repayment/repayment.component';
import { ProfileComponent } from './components/profile/profile.component';
import { RegGhostProfileComponent } from './components/reg-ghost-profile/reg-ghost-profile.component';
import { ListOfLoansComponent } from './components/list-of-loans/list-of-loans.component';
import { LoggedStatusDisplayComponent } from './components/logged-status-display/logged-status-display.component';
import { LoansOfContactComponent } from './components/loans-of-contact/loans-of-contact.component';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { MatSidenavModule } from '@angular/material/sidenav';
import { MatButtonModule } from '@angular/material/button';
import { MatTableModule } from '@angular/material/table';
import { MatInputModule } from '@angular/material/input';
import { MatIconModule } from '@angular/material/icon';
import { MatListModule } from '@angular/material/list';
import { MatFormFieldModule } from '@angular/material/form-field';
import { LoanDetailComponent } from './components/loan-detail/loan-detail.component';
import { ClearDebtsComponent } from './components/clear-debts/clear-debts.component';


@NgModule({
    declarations: [
        AppComponent,
        AuthenticationComponent,
        RegistrationComponent,
        ContactsComponent,
        SearchingComponent,
        NewLoanComponent,
        RepaymentComponent,
        ProfileComponent,
        RegGhostProfileComponent,
        ListOfLoansComponent,
        LoggedStatusDisplayComponent,
        LoansOfContactComponent,
        LoanDetailComponent,
        ClearDebtsComponent,
    ],
    imports: [
        BrowserModule,
        AppRoutingModule,
        HttpClientModule,
        FormsModule,
        BrowserAnimationsModule,
        MatSidenavModule,
        MatButtonModule,
        MatTableModule,
        MatInputModule,
        MatIconModule,
        MatFormFieldModule,
        MatListModule,
    ],
    providers: [],
    bootstrap: [AppComponent]
})
export class AppModule { }
