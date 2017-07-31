import { Component, OnInit, ViewChild } from '@angular/core';
import { WalletService } from '../../../services/wallet.service';
import { MdDialog } from '@angular/material';

@Component({
  selector: 'app-history',
  templateUrl: './history.component.html',
  styleUrls: ['./history.component.css']
})
export class HistoryComponent implements OnInit {
  @ViewChild('table') table: any;
  transactions: any[];

  constructor(
    public dialog: MdDialog,
    public walletService: WalletService,
  ) { }

  ngOnInit() {
    this.walletService.history().subscribe(transactions => this.transactions = this.mapTransactions(transactions));
  }

  private mapTransactions(transactions) {
    return transactions.map(transaction => {
      transaction.amount = transaction.outputs.map(output => output.coins >= 0 ? output.coins : 0)
        .reduce((a , b) => a + parseInt(b), 0);
      return transaction;
    });
  }
}
