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

    this.rest.getProdutos().subscribe(
      data => {

        const response = (data as any);
        const objeto_retorno = JSON.parse(response._body);
        this.lista_produtos = objeto_retorno;

        console.log(objeto_retorno);
      }, error => {
        console.log(error);
      }
    )
  }

  async scanBarcode() {
    this.results = await this.barcodeScanner.scan();
    console.log(this.results);

  }

}
