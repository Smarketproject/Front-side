import { Component } from '@angular/core';
import { IonicPage, NavController, NavParams, LoadingController } from 'ionic-angular';
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
    public form: FormProvider,
    public loadingCtrl: LoadingController,

  ) {
  }

  ionViewDidLoad() {
  }

  /*
    Requisição para testa o produto, deve ser substituído no arquivo carrinho.html por um dos métodos scanBarcode()
  */
  public teste() {
    let data = {
      bar_code: "123123"
    }
    this.getProduto(data);
  }

/*
  Scanner de código de barras
  Nas branches eu (Álvaro) encontrei duas possibilidades, temos que testar as duas pra ver qual é a certa.
  A primeira que der certo ta valendo.
  **************************Apagar esse comentário e uma das opções**************************
*/
  
  //Opção 1
  //Faz a leitura do código de barras e chama o método getProduto()
  public scanBarcode() {
    this.barcodeScanner.scan().then(results => {
      let data = {
        bar_code: results.text
      }
      this.getProduto(data);

    },
      error => {

      });

  }
  //Opção 2
  //Faz a leitura do código de barras e chama o método getProduto()
  // async scanBarcode() {
  //   var results = await this.barcodeScanner.scan();
  //   let data = {
  //     bar_code: results.text
  //   }
  //   this.getProduto(data);
  // }

 
 
  //Requisita ao servidor as informações de um produto a partir do seu código de barras
  private getProduto(data: any) {
    this.rest.postProduto(data).subscribe(
      data => {
        var produto = {
          name: data[0].name,
          price: data[0].price,
          id: data[0].id,
          quantidade: 1
        }
        if (this.procurarProduto(produto.id) == -1) {//Verifica se o produto já foi adicionado à lista
          this.produtos.push(produto);//Adiciona à lista de produtos
        } else {
          this.form.presentToast('Esse produto já foi adicionado à lista.');
        }
      }, error => {
        this.form.presentToast('Não foi possível comunicar com o servidor.');
      });
  }

  //Procura um produto a partir da chave id do produto
  private procurarProduto(id) {
    for (var _i = 0; _i < this.produtos.length; _i++) {
      var produto = this.produtos[_i];
      if (produto.id == id) {
        return _i;
      }
    }
    return -1;
  }
  //Retira um produto a partir do seu id
  public retirar(id) {
    var index = this.procurarProduto(id);
    if (index != -1) {
      this.produtos.splice(index, 1);
    }
  }
}
