import { Component } from '@angular/core';
import { IonicPage, NavController, NavParams } from 'ionic-angular';
import { BarcodeScanner, BarcodeScannerOptions } from '@ionic-native/barcode-scanner';
import { RestProvider } from '../../providers/rest/rest';
import 'rxjs/add/operator/map';
import { FormProvider } from '../../providers/form/form';


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
  public produtos = new Array<any>();

  constructor(public navCtrl: NavController,
    public navParams: NavParams,
    private barcodeScanner: BarcodeScanner,
    public rest: RestProvider,
    public form: FormProvider
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
        // console.log(data[0]);
        // console.log(produto);
        var produto = {
          name: data[0].name,
          price: data[0].price,
          id: data[0].id,
        }
        if(this.procurarProduto(produto.id) == -1){
          this.produtos.push(produto);
        }else{
          this.form.presentToast('Esse produto já foi adicionado à lista.');
        }
      }, error=>{
        console.log(error);
      });
  }
  async scanBarcode() {
    this.results = await this.barcodeScanner.scan();
    console.log(this.results);

  }

  private procurarProduto(id){
    for(var _i=0; _i < this.produtos.length; _i++){
      var produto = this.produtos[_i];
      if(produto.id == id){
        return _i;
      }
    }
    return -1;
  }
  public retirar(id){
    var index = this.procurarProduto(id);
    if(index != -1){
      this.produtos.splice(index, index);
    }
    
  }
}
