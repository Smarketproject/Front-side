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

      constructor(public navCtrl: NavController, public navParams: NavParams,
                  public alertCtrl: AlertController,
                  public http: Http,
                  public rest: RestProvider,){
  
      }


      private getCompras(){
        this.rest.getCompras(this.navParams.get('token')).subscribe(
          data =>{
            console.log(data);
            this.compras = data
          },erro=>{

          })
      }

      private getCompra(){
        this.rest.getCompra(this.navParams.get('token')).subscribe(
          data =>{
            console.log(data);
            this.compra = data
          },erro=>{

          })
      }

      public reorder_date(at){
        var hora = "Horario: " + at.slice(11,16)
        var data = at.slice(8,10) + " - " + at.slice(5,7) + " - " + at.slice(0,4) + " \ "
        return data + hora
      }

      ionViewDidLoad() {
        this.getCompras();
        //this.getCompra();
        
      }
      //  showHistory(){
      //    let alert = this.alertCtrl.create();
      //    alert.setTitle('Histórico Data 20/10/2017 Valor:R$ 15,90');
        

      //    alert.addInput({
      //      type: 'checkbox',
      //      label: 'Biscoito Oreo R$ 3,90',
      //      value: 'value1',
          
      //    });

      //    alert.addButton('Cancel');
      //    alert.addButton({
      //      text: 'Adicionar Produtos na nova lista',
      //      handler: data => {
      //       console.log('Checkbox data:', data);
      //       this.testshowHistoryOpen = false;
      //       this.testshowHistoryResult = data;
      //      }
      //    });
      //    alert.present();
      //  }
      }


