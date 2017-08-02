import { Injectable } from '@angular/core';
import { ApiService } from './api.service';
import 'rxjs/add/operator/do';

@Injectable()
export class BlockchainService {

  constructor(
    private apiService: ApiService,
  ) { }

  blocks() {
    return this.apiService.get('last_blocks', {num: 100}).map(response => response.blocks)
      .do(blocks => console.log(blocks));
  }
}
