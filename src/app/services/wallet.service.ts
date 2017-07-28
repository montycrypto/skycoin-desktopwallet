import { Injectable } from '@angular/core';
import { ApiService } from './api.service';
import { BehaviorSubject } from 'rxjs/BehaviorSubject';
import { Subject } from 'rxjs/Subject';
import { WalletModel } from '../models/wallet.model';
import { Observable } from 'rxjs/Observable';
import 'rxjs/add/observable/forkJoin';
import 'rxjs/add/operator/first';

@Injectable()
export class WalletService {

  wallets: Subject<WalletModel[]> = new BehaviorSubject<WalletModel[]>([]);

  constructor(
    private apiService: ApiService
  ) {
    this.loadData();
  }

  all(): Observable<WalletModel[]> {
    return this.wallets.asObservable();
  }

  }

  private loadData(): void {
    this.retrieveWallets().first().subscribe(wallets => {
      this.wallets.next(wallets);
      this.refreshBalances();
    });
  }

  private refreshBalances() {
    this.wallets.first().subscribe(wallets => {
      Observable.forkJoin(wallets.map(wallet => this.retrieveWalletBalance(wallet).map(balance => {
        wallet.balance = balance.confirmed.coins / 1000000;
        return wallet;
      })))
        .subscribe(newWallets => this.wallets.next(newWallets));
    });
  }

  private retrieveWalletBalance(wallet: WalletModel): Observable<any> {
    return this.apiService.get('wallet/balance', {id: wallet.meta.filename});
  }

  private retrieveWallets(): Observable<WalletModel[]> {
    return this.apiService.get('wallets');
  }
}
