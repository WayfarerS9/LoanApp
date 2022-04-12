import { Component, OnInit } from '@angular/core';
import { GetInformationService } from '../../services/get-information.service'
import { Loan } from '../../interfaces/loan';

@Component({
  selector: 'app-clear-debts',
  templateUrl: './clear-debts.component.html',
  styleUrls: ['./clear-debts.component.css']
})
export class ClearDebtsComponent implements OnInit {

  allDebts: any[] = [];

  constructor(
    private getInformationService: GetInformationService,
  ) { }

  ngOnInit(): void {
    this.getAllDebts();
}

private getAllDebts(): void {
  this.getInformationService.getAllDebts()
      .subscribe(result => {
          this.allDebts = result;
      });
}



}
