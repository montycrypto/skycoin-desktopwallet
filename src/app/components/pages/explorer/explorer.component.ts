import { Component, OnInit } from '@angular/core';
import { BlockchainService } from '../../../services/blockchain.service';

@Component({
  selector: 'app-explorer',
  templateUrl: './explorer.component.html',
  styleUrls: ['./explorer.component.css']
})
export class ExplorerComponent implements OnInit {

  blocks: any[];

  constructor(
    public blockchainService: BlockchainService,
  ) { }

  ngOnInit() {
    this.blockchainService.blocks().subscribe(data => this.blocks = data);
  }

  onActivate() {
    console.log('activate');
  }
}
