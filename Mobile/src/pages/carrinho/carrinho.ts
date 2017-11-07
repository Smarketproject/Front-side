import { Component } from '@angular/core';
import { IonicPage, NavController, NavParams } from 'ionic-angular';
import { BarcodeScanner, BarcodeScannerOptions } from '@ionic-native/barcode-scanner';
import { RestProvider } from '../../providers/rest/rest';
import 'rxjs/add/operator/map';


@IonicPage()
@Component({
  selector: 'page-carrinho',
  templateUrl: 'carrinho.html',
  providers: [
    RestProvider
  ]
})
export class CarrinhoPage {

  options: BarcodeScannerOptions;
  results: {};

  public lista_produtos = new Array<any>();

  constructor(public navCtrl: NavController,
    public navParams: NavParams,
    private barcodeScanner: BarcodeScanner,
    public rest: RestProvider
  ) {
  }

  ionViewDidLoad() {

  }

  public teste(){
    let data ={
      bar_code: "123123"
    }
    this.rest.postProduto(data).subscribe(
      data=>{
        console.log(data);
      }, error=>{
        console.log(error);
      });
  }
  async scanBarcode() {
    this.results = await this.barcodeScanner.scan();
    console.log(this.results);

  }

}
