import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';
import {
  MdButtonModule, MdCardModule, MdDialogModule, MdExpansionModule, MdIconModule, MdListModule,
  MdTabsModule
} from '@angular/material';
import { NoopAnimationsModule } from '@angular/platform-browser/animations';

import { AppComponent } from './app.component';
import { HttpModule } from '@angular/http';
import { ApiService } from './services/api.service';
import { WalletService } from './services/wallet.service';
import { AddressDetailComponent } from './components/pages/wallets/address-detail/address-detail.component';
import { CreateWalletComponent } from './components/pages/wallets/create-wallet/create-wallet.component';

@NgModule({
  declarations: [
    AppComponent,
    AddressDetailComponent,
    CreateWalletComponent,
  ],
  entryComponents: [
    CreateWalletComponent,
  ],
  imports: [
    BrowserModule,
    HttpModule,
    MdButtonModule,
    MdCardModule,
    MdExpansionModule,
    MdIconModule,
    MdListModule,
    MdTabsModule,
    NoopAnimationsModule,
  ],
  providers: [
    ApiService,
    WalletService,
  ],
  bootstrap: [AppComponent]
})
export class AppModule { }
