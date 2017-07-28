import { Component, Input } from '@angular/core';
import { WalletService } from '../../../../services/wallet.service';
import { WalletModel } from '../../../../models/wallet.model';

@Component({
  selector: 'app-address-detail',
  templateUrl: './address-detail.component.html',
  styleUrls: ['./address-detail.component.css']
})
export class AddressDetailComponent {
  @Input() wallet: WalletModel;

  constructor(
    public walletService: WalletService
  ) {}

  addAddress() {
    //
  }

  addWallet() {
    //
  }
}
