import { Component } from '@angular/core';
import { IonicPage, NavController, NavParams } from 'ionic-angular';
import { LoginPage } from '../login/login';
import { HistoricoPage } from '../historico/historico';

@IonicPage()
@Component({
  selector: 'page-menu',
  templateUrl: 'menu.html',
})
export class MenuPage {

  constructor(public navCtrl: NavController, public navParams: NavParams) {
    console.log(this.navParams.get('token'));
  }

  ionViewDidLoad() {
    
  }

  
  //Vai para a página do histórico
  goToHistorico(){
    this.navCtrl.push(HistoricoPage);
    
  }
  //Vai para a página de atualização do cadastro
  goToAtualizarCadastro(){
    //falta criar a página
  }

  goToLogin(){
    this.navCtrl.setRoot(LoginPage);
  }



}
