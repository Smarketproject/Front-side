import { Component } from '@angular/core';
import { IonicPage, NavController, NavParams } from 'ionic-angular';
import { AlertController } from 'ionic-angular';
import { RestProvider } from '../../providers/rest/rest';
import { Http } from '@angular/http';
import 'rxjs/add/operator/map';
import { CarrinhoPage } from '../carrinho/carrinho';

    @IonicPage()
    @Component({
      selector: 'page-historico',
      templateUrl: 'historico.html',
    })
    export class HistoricoPage {

      private compras = new Array<any>();
      private compra = new Array<any>();


      constructor(
        public navCtrl: NavController, public navParams: NavParams,
        public alertCtrl: AlertController,
        public http: Http,
        public rest: RestProvider
        )
      {
        this.getCompras();
      }

      ionViewDidLoad() {}

      private getCompras(){
        this.rest.getCompras(this.navParams.get('token')).subscribe(
          data =>{
            this.compras = this.reordenarHistorico(data);
          },erro=>{

          })
      }


      public getDate(at){
        return at.slice(8,10) + " / " + at.slice(5,7) + " / " + at.slice(0,4);
      }

      public getTime(at){
        return at.slice(11,16);
      }
      
      public showHistory(compra){
        
        this.rest.getCompra(this.navParams.get('token'),compra.cart_id).subscribe(data=>{
          this.historyPopUp(compra, data);
        }, error=>{
        })
        
      }  

      private historyPopUp(compra:any, produtos:any){
        let alert = this.alertCtrl.create();
        var title = '<span>Data: ' + this.getDate(compra.created_at)+'</span><br>' + '<span>Valor: R$' + compra.Total + '</span>'; 
        alert.setTitle(title);
        
        for(let produto of produtos){
          alert.addInput({
            type: 'checkbox',
            label: produto.name + ' R$ ' + (produto.price * produto.quantity) + " ( " + produto.quantity +" )",
            value: produto.bar_code,
          
          });
        }

        alert.addButton('Voltar');
        alert.addButton({
          text: 'Adicionar Produtos',
          handler: data => {
            if(data.length > 0){
              this.goToCarrinho(data)
            }
          }
        });
        alert.present();
      }

      private goToCarrinho(produtos: any){
        this.navCtrl.push(
          CarrinhoPage,
          {
            token: this.navParams.get('token'),
            produtos: produtos
          }
        );
        
      }

      private reordenarHistorico(data){
        for(var _i = 0; _i < data.length/2; _i++){
          var aux = data[_i];
          data[_i] = data[data.length - 1 - _i];
          data[data.length - _i] = aux;
        }
        return data;
      }
    }

      

