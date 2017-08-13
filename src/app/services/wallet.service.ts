import { Injectable } from '@angular/core';
import { ApiService } from './api.service';
import { BehaviorSubject } from 'rxjs/BehaviorSubject';
import { Subject } from 'rxjs/Subject';
import { WalletModel } from '../models/wallet.model';
import { Observable } from 'rxjs/Observable';
import 'rxjs/add/observable/forkJoin';
import 'rxjs/add/operator/first';
import 'rxjs/add/operator/mergeMap';

@Injectable()
export class WalletService {

  transactions: Subject<any[]> = new BehaviorSubject<any[]>([]);
  wallets: Subject<WalletModel[]> = new BehaviorSubject<WalletModel[]>([]);

  constructor(
    private apiService: ApiService
  ) {
    this.loadData();
  }

  addressesAsString(): Observable<string> {
    return this.all().map(wallets => wallets.map(wallet => {
      return wallet.entries.reduce((a, b) => {
        a.push(b.address);
        return a;
      }, []).join(',');
    }).join(','));
  }

  addAddress(wallet: WalletModel) {
    return this.apiService.post('wallet/newAddress', {id: wallet.meta.filename});
  }

  all(): Observable<WalletModel[]> {
    return this.wallets.asObservable();
  }

  create(label, seed) {
    return this.apiService.post('wallet/create', {label: label, seed: seed});
  }

  folder(): Observable<string> {
    return this.apiService.get('wallets/folderName').map(response => response.address);
  }

  generateSeed(): Observable<string> {
    return this.apiService.get('wallet/newSeed').map(response => response.seed);
  }

  history(): Observable<any[]> {
    return this.transactions.asObservable();
  }

  outputs(): Observable<any> {
    return this.addressesAsString()
      .filter(addresses => !!addresses)
      .flatMap(addresses => this.apiService.get('outputs', {addrs: addresses}));
  }

  pendingTransactions(): Observable<any> {
    return this.apiService.get('pendingTxs');
  }

  renameWallet(wallet: WalletModel, label: string): Observable<WalletModel> {
    return this.apiService.post('wallet/update', { id: wallet.meta.filename, label: label });
  }

  sendSkycoin(wallet_id: string, address: string, amount: number) {
    return this.apiService.post('wallet/spend', {id: wallet_id, dst: address, coins: amount});
  }

  sum(): Observable<number> {
    return this.all().map(wallets => wallets.map(wallet => wallet.balance >= 0 ? wallet.balance : 0).reduce((a , b) => a + b, 0));
  }

  transaction(txid: string): Observable<any> {
    return this.apiService.get('transaction', {txid: txid}).flatMap(transaction => {
      return Observable.forkJoin(transaction.txn.inputs.map(input => this.retrieveInputAddress(input).map(response => {
        return response.owner_address;
      }))).map(inputs => {
        transaction.txn.inputs = inputs;
        return transaction;
      });
    });
  }

  private loadData(): void {
    this.retrieveWallets().first().subscribe(wallets => {
      this.wallets.next(wallets);
      this.refreshBalances();
      // this.retrieveHistory();
      this.retrieveTransactions();
    });
  }

  private refreshBalances() {
    this.wallets.first().subscribe(wallets => {
      Observable.forkJoin(wallets.map(wallet => this.retrieveWalletBalance(wallet).map(response => {
        wallet.entries = response;
        wallet.balance = response.map(address => address.balance >= 0 ? address.balance : 0).reduce((a , b) => a + b, 0);
        return wallet;
      })))
        .subscribe(newWallets => this.wallets.next(newWallets));
    });
  }

  private retrieveAddressBalance(address: any|any[]) {
    const addresses = Array.isArray(address) ? address.map(address => address.address).join(',') : address.address;
    return this.apiService.get('balance', {addrs: addresses});
  }

  private retrieveAddressTransactions(address: any) {
    return this.apiService.get('explorer/address', {address: address.address});
  }

  private retrieveInputAddress(input: string) {
    return this.apiService.get('uxout', {uxid: input});
  }

  private retrieveTransactions() {
    return this.wallets.first().subscribe(wallets => {
      Observable.forkJoin(wallets.map(wallet => this.retrieveWalletTransactions(wallet)))
        .map(addresses => [].concat.apply([], addresses).sort((a, b) =>  b.timestamp - a.timestamp))
        .subscribe(transactions => this.transactions.next(transactions));
    });
  }

  private retrieveWalletBalance(wallet: WalletModel): Observable<any> {
    return Observable.forkJoin(wallet.entries.map(address => this.retrieveAddressBalance(address).map(balance => {
      address.balance = balance.confirmed.coins;
      return address;
    })));
  }

  private retrieveWalletTransactions(wallet: WalletModel) {
    return Observable.forkJoin(wallet.entries.map(address => this.retrieveAddressTransactions(address)))
      .map(addresses => [].concat.apply([], addresses));
  }

  private retrieveWalletUnconfirmedTransactions(wallet: WalletModel) {
    return this.apiService.get('wallet/transactions', {id: wallet.meta.filename});
  }

  private retrieveWallets(): Observable<WalletModel[]> {
    return this.apiService.get('wallets');
  }
}
