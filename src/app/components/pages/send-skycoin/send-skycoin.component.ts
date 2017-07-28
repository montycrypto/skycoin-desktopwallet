import { Component, OnInit } from '@angular/core';
import { WalletService } from '../../../services/wallet.service';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';

@Component({
  selector: 'app-send-skycoin',
  templateUrl: './send-skycoin.component.html',
  styleUrls: ['./send-skycoin.component.css']
})
export class SendSkycoinComponent implements OnInit {

  form: FormGroup;

  constructor(
    public formBuilder: FormBuilder,
    public walletService: WalletService
  ) {}

  ngOnInit() {
    this.initForm();
  }

  send() {
    this.walletService.sendSkycoin(this.form.value.wallet_id, this.form.value.address, this.form.value.amount)
      .subscribe(response => console.log(response));
  }

  private initForm() {
    this.form = this.formBuilder.group({
      wallet_id: ['', Validators.required],
      address: ['', Validators.required],
      amount: ['', Validators.required],
    });

    this.form.controls.address.setValue('2aoDbTxBZzB2v9BvYgfswhQAu8Lq4Vub8iz');
  }
}
