import { Component } from '@angular/core';
import { IonicPage, NavController, NavParams } from 'ionic-angular';
import { BarcodeScanner } from '@ionic-native/barcode-scanner';

@IonicPage()
@Component({
  selector: 'page-carrinho',
  templateUrl: 'carrinho.html',
})
export class CarrinhoPage {

  constructor(public navCtrl: NavController, public navParams: NavParams,
              private barcodeScanner: BarcodeScanner) {
  }

  ionViewDidLoad(){
    console.log('ionViewDidLoad CarrinhoPage');
  }

  getcode(){
    this.barcodeScanner.scan().then((barcodeData) => {
      // Success! Barcode data is here
     }, (err) => {
         console.log(err);
     });
    }

}
