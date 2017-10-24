import { Component } from '@angular/core';
import { IonicPage, NavController, NavParams } from 'ionic-angular';
import { RestProvider } from '../../providers/rest/rest';
import { CadastroPage } from '../cadastro/cadastro';
import { MenuPage } from '../menu/menu';

@IonicPage()
@Component({
  selector: 'page-login',
  templateUrl: 'login.html',
})
export class LoginPage {
  account = {
    email: "",
    password: "",
  }
  constructor(public navCtrl: NavController, public navParams: NavParams, public rest: RestProvider) {
  }

  ionViewDidLoad() {
    
  }

  goToCadastro(){
    this.navCtrl.push(CadastroPage);
  }

  goToMenu(){
    this.navCtrl.setRoot(MenuPage);
  }

}
