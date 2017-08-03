import { Injectable } from '@angular/core';
import { ApiService } from './api.service';
import { Observable } from 'rxjs/Observable';

@Injectable()
export class BlockchainService {

  constructor(
    private apiService: ApiService,
  ) { }

  block(id): Observable<any> {
    return this.apiService.get('blocks', { start: id, end: id }).map(response => response.blocks[0]).flatMap(block => {
      return Observable.forkJoin(block.body.txns.map(transaction => {
        return Observable.forkJoin(transaction.inputs.map(input => this.retrieveInputAddress(input).map(response => {
          return response.owner_address;
        }))).map(inputs => {
          transaction.inputs = inputs;
          return transaction;
        });
      })).map(transactions => {
        block.body.txns = transactions;
        return block;
      });
    });
  }

  blocks() {
    return this.apiService.get('last_blocks', { num: 100 }).map(response => response.blocks.reverse());
  }

  private retrieveInputAddress(input: string) {
    return this.apiService.get('uxout', {uxid: input});
  }
}
