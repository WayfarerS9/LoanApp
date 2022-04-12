import { Component, OnInit } from '@angular/core';
import { SearchService } from '../../services/search.service';
import { User } from '../../interfaces/user';
import { Observable, Subject } from 'rxjs';
import {
    debounceTime, distinctUntilChanged, switchMap
} from 'rxjs/operators';
import { AddInformationService } from '../../services/add-information.service';

@Component({
    selector: 'app-searching',
    templateUrl: './searching.component.html',
    styleUrls: ['./searching.component.css']
})
export class SearchingComponent implements OnInit {
    users$!: Observable<User[]>;
    nameValue = '';
    secondNameValue = '';
    private searchTerms = new Subject<string>();

    constructor(
        private searchService: SearchService,
        private addInformationService: AddInformationService
    ) { }

    processingPassValue(name: string, secondName: string, telNum: string): void {
        const passingValue: string = `?name=${name}&secondName=${secondName}&telNum=${telNum}`;
        this.searchUsersByName(passingValue)
    }

    public searchUsersByName(term: string): void {
        this.searchTerms.next(term);
    };

    ngOnInit() {
        this.users$ = this.searchTerms.pipe(
            debounceTime(700),
            distinctUntilChanged(),
            switchMap((term: string) => this.searchService.searchUsers(term)),
        );
    }

    addToContacts(user: any): void {
        console.log(user)
        this.addInformationService.addToContacts(user)
            .subscribe( (result) => {
                alert(result.message);
            });
    }
}
