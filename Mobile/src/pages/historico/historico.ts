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
     
      testshowHistoryResult: any;
      testshowHistoryOpen: boolean;

      private url:string = 'http://localhost:8000/product'
      public show:Array<{}>;

      constructor(public navCtrl: NavController, public navParams: NavParams,
                  public alertCtrl: AlertController,
                  public http: Http
      ) {
        this.http.get(this.url + '/show')
        .map(res => res.json())
        .subscribe(data =>{
          this.show = data;
        });
      }

      ionViewDidLoad() {
        console.log(this.navParams.get('token'));
      }
      showHistory(){
        let alert = this.alertCtrl.create();
        alert.setTitle('Histórico Data 20/10/2017 Valor:R$ 15,90');
        

        alert.addInput({
          type: 'checkbox',
          label: 'Biscoito Oreo R$ 3,90',
          value: 'value1',
          
        });

        alert.addInput({
          type: 'checkbox',
          label: 'Coca Cola 2L R$ 5,99',
          value: 'value2'
        });

        alert.addInput({
          type: 'checkbox',
          label: 'Sorvete Kibon R$ 14,99',
          value: 'value3'
        });

        alert.addInput({
          type: 'checkbox',
          label: 'Cerveja Budweiser R$ 3,99',
          value: 'value4'
        });

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


