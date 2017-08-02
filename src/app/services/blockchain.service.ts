import { Injectable } from '@angular/core';
import { ApiService } from './api.service';
import { Observable } from 'rxjs/Observable';

@Injectable()
export class BlockchainService {

  constructor(
    private apiService: ApiService,
  ) { }

  block(id): Observable<any> {
    return this.apiService.get('blocks', { start: id, end: id }).map(response => response.blocks[0]);
  }

  blocks() {
    return this.apiService.get('last_blocks', { num: 100 }).map(response => response.blocks.reverse());
  }
}
