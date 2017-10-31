import { Component } from '@angular/core';
import { IonicPage, NavController, NavParams } from 'ionic-angular';
import { BarcodeScanner, BarcodeScannerOptions } from '@ionic-native/barcode-scanner';


@IonicPage()
@Component({
  selector: 'page-carrinho',
  templateUrl: 'carrinho.html',
})
export class CarrinhoPage {

  options: BarcodeScannerOptions;
  results: {};

  constructor(public navCtrl: NavController, public navParams: NavParams,
              private barcodeScanner: BarcodeScanner) {
  }

  ionViewDidLoad(){
    console.log('ionViewDidLoad CarrinhoPage');
  }
  
  async scanBarcode(){
    this.results = await this.barcodeScanner.scan();
    console.log(this.results);
   
 }

}
