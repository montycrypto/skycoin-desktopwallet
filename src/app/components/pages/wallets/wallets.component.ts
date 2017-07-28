import { Component } from '@angular/core';
import { WalletService } from '../../../services/wallet.service';
import { MdDialog } from '@angular/material';
import { CreateWalletComponent } from './create-wallet/create-wallet.component';

@Component({
  selector: 'app-wallets',
  templateUrl: './wallets.component.html',
  styleUrls: ['./wallets.component.css']
})
export class WalletsComponent {

  constructor(
    public walletService: WalletService,
    private dialog: MdDialog,
  ) {}

  addWallet() {
    this.dialog.open(CreateWalletComponent).afterClosed().subscribe(result => {
      //
    });
  }
}
