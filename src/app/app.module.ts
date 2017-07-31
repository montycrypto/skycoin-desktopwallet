import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';
import {
  MdButtonModule, MdCardModule, MdDialogModule, MdExpansionModule, MdIconModule, MdInputModule, MdListModule,
  MdSelectModule, MdTabsModule
} from '@angular/material';
import { NoopAnimationsModule } from '@angular/platform-browser/animations';
import { AppComponent } from './app.component';
import { HttpModule } from '@angular/http';
import { ApiService } from './services/api.service';
import { WalletService } from './services/wallet.service';
import { WalletsComponent } from './components/pages/wallets/wallets.component';
import { WalletDetailComponent } from './components/pages/wallets/address-detail/wallet-detail.component';
import { CreateWalletComponent } from './components/pages/wallets/create-wallet/create-wallet.component';
import { ReactiveFormsModule } from '@angular/forms';
import { SkyPipe } from './pipes/sky.pipe';
import { SendSkycoinComponent } from './components/pages/send-skycoin/send-skycoin.component';
import { NgxDatatableModule } from '@swimlane/ngx-datatable';
import { HistoryComponent } from './components/pages/history/history.component';
import { DateFromNowPipe } from './pipes/date-from-now.pipe';

@NgModule({
  declarations: [
    AppComponent,
    HistoryComponent,
    WalletsComponent,
    WalletDetailComponent,
    CreateWalletComponent,
    SkyPipe,
    SendSkycoinComponent,
    DateFromNowPipe,
  ],
  entryComponents: [
    CreateWalletComponent,
  ],
  imports: [
    BrowserModule,
    HttpModule,
    MdButtonModule,
    MdCardModule,
    MdDialogModule,
    MdExpansionModule,
    MdIconModule,
    MdInputModule,
    MdListModule,
    MdSelectModule,
    MdTabsModule,
    NgxDatatableModule,
    NoopAnimationsModule,
    ReactiveFormsModule,
  ],
  providers: [
    ApiService,
    WalletService,
  ],
  bootstrap: [AppComponent]
})
export class AppModule { }
