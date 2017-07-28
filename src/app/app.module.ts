import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';
import { MdCardModule, MdExpansionModule, MdIconModule, MdListModule, MdTabsModule } from '@angular/material';
import { NoopAnimationsModule } from '@angular/platform-browser/animations';

import { AppComponent } from './app.component';
import { HttpModule } from '@angular/http';
import { ApiService } from './services/api.service';
import { WalletService } from './services/wallet.service';

@NgModule({
  declarations: [
    AppComponent
  ],
  imports: [
    BrowserModule,
    HttpModule,
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
