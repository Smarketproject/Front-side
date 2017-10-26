import { Component } from '@angular/core';
import { IonicPage, NavController, NavParams } from 'ionic-angular';
import { RestProvider } from '../../providers/rest/rest';
import { CadastroPage } from '../cadastro/cadastro';
import { MenuPage } from '../menu/menu';
import { FormProvider } from '../../providers/form/form';

@IonicPage()
@Component({
  selector: 'page-login',
  templateUrl: 'login.html',
})
export class LoginPage {
  public resposta:Array<{}>;
  account = {
    username: "",
    password: "",
  }
  constructor(
    public navCtrl: NavController, 
    public navParams: NavParams, 
    public rest: RestProvider,
    public form: FormProvider
  ) {
  
  }

  ionViewDidLoad() {
  }

  //Vai para a página de cadastro
  goToCadastro(){
    this.navCtrl.push(CadastroPage);
  }

  //Vai para a página de menu
  goToMenu(){
    this.navCtrl.setRoot(MenuPage);
  }

  doSignin(){
    this.rest.postLogin(this.account)
      .subscribe(data=>{
        console.log(data);
      });
  }
}