import { Injectable } from '@angular/core';
import { ApiService } from './api.service';
import { BehaviorSubject } from 'rxjs/BehaviorSubject';
import { Subject } from 'rxjs/Subject';
import { WalletModel } from '../models/wallet.model';
import { Observable } from 'rxjs/Observable';

@Injectable()
export class WalletService {

  wallets: Subject<WalletModel[]> = new BehaviorSubject<WalletModel[]>([]);

  constructor(
    private apiService: ApiService
  ) {
    this.retrieveWallets();
  }

  all(): Observable<WalletModel[]> {
    return this.wallets.asObservable();
  }

  private retrieveWallets() {
    this.apiService.get('wallets').subscribe(data => {
      console.log(data);
    });
    // return Observable.fromPromise(this.file.listDir(this.file.externalRootDirectory, 'superwallet'))
    //   .map(paths => paths.filter(path => path.name.substr(path.name.length - 4) === '.wlt'))
    //   .flatMap(paths => {
    //     const files = paths.map(path => this.file.readAsText(this.file.externalRootDirectory, 'superwallet/' + path.name));
    //     return Observable.forkJoin(files).map(files => files.map(file => {
    //       let wallet = JSON.parse(file);
    //       wallet.balance = -1;
    //       return wallet;
    //     }));
    //   });
  }

  private loadData(): void {
    // this.indexWallets().first().subscribe(wallets => {
    //   this.wallets.next(wallets);
    //   this.refreshBalances();
    // });
  }
}
