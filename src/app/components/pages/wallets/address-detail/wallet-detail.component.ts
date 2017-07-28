import { Component, Input } from '@angular/core';
import { WalletService } from '../../../../services/wallet.service';
import { WalletModel } from '../../../../models/wallet.model';

@Component({
  selector: 'app-wallet-detail',
  templateUrl: './wallet-detail.component.html',
  styleUrls: ['./wallet-detail.component.css']
})
export class WalletDetailComponent {
  @Input() wallet: WalletModel;

  constructor(
    public walletService: WalletService
  ) {}

  addAddress() {
    this.walletService.addAddress(this.wallet).subscribe(output => this.wallet.entries.push(output));
  }
}
