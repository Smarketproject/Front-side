import { Component } from '@angular/core';
import { IonicPage, NavController, NavParams } from 'ionic-angular';
import { AlertController } from 'ionic-angular';
import { RestProvider } from '../../providers/rest/rest';
import { Http } from '@angular/http';
import 'rxjs/add/operator/map';

    @IonicPage()
    @Component({
      selector: 'page-historico',
      templateUrl: 'historico.html',
    })
    export class HistoricoPage {

      private compras = new Array<any>();
      private compra = new Array<any>();
      private testshowHistoryOpen;
      private testshowHistoryResult;


      constructor(public navCtrl: NavController, public navParams: NavParams,
                  public alertCtrl: AlertController,
                  public http: Http,
                  public rest: RestProvider){
  
      }


      private getCompras(){
        this.rest.getCompras(this.navParams.get('token')).subscribe(
          data =>{
            this.compras = data
          },erro=>{

          })
      }


      public getDate(at){
        return at.slice(8,10) + " - " + at.slice(5,7) + " - " + at.slice(0,4) + " \ ";
      }

      public getTime(at){
        return at.slice(11,16);
      }

      
      ionViewDidLoad() {
        this.getCompras();
        //this.getCompra();
        
      }
      showHistory(compra){
        
        this.rest.getCompra(this.navParams.get('token'),compra.cart_id).subscribe(data=>{
          // console.log(compra);
          // console.log(data);
          this.historyPopUp(compra, data);
        }, error=>{
            console.log(error)
        })
        
      }  

       private historyPopUp(compra:any, produtos:any){
        let alert = this.alertCtrl.create();
        var title = 'Historico Data: ' + this.getDate(compra.created_at) + ' Valor: ' + compra.Total; 
        alert.setTitle(title);
        
        for(let produto of produtos){
          alert.addInput({
            type: 'checkbox',
            label: produto.name + ' R$ ' + (produto.price * produto.quantity) + " ( " + produto.quantity +" )",
            value: produto.bar_code,
          
          });
        }

        alert.addButton('Cancel');
        alert.addButton({
          text: 'Adicionar Produtos na nova lista',
          handler: data => {
          console.log('Checkbox data:', data);
          this.testshowHistoryOpen = false;
          this.testshowHistoryResult = data;
          }
        });
        alert.present();
      }
    }

      

