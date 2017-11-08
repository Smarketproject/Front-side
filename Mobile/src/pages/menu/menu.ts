import { Component } from '@angular/core';
import { IonicPage, NavController, NavParams } from 'ionic-angular';
import { LoginPage } from '../login/login';
import { HistoricoPage } from '../historico/historico';
import { CarrinhoPage } from '../carrinho/carrinho';
import { RestProvider } from '../../providers/rest/rest';

@IonicPage()
@Component({
  selector: 'page-menu',
  templateUrl: 'menu.html',
})
export class MenuPage {

  constructor(
    public navCtrl: NavController, 
    public navParams: NavParams,
    public rest: RestProvider
  ) {
    
  }

  ionViewDidLoad() {
    console.log(this.navParams.get('token'));
  }

  //Vai para a página do histórico
  goToCarrinho(){
    this.navCtrl.push(
      CarrinhoPage,
      {
        token: this.navParams.get('token')
      }
    );
    
  }
  //Vai para a página do histórico
  goToHistorico(){
    this.navCtrl.push(
      HistoricoPage,
      {
        token: this.navParams.get('token')
      }
    );
    
  }
  //Vai para a página de atualização do cadastro
  goToAtualizarCadastro(){
    //falta criar a página
  }

  goToLogin(){
    this.rest.postLogout(this.navParams.get('token')).subscribe(
      data=>{
        console.log(data);
        this.navCtrl.setRoot(LoginPage);
      }, 
      error=>{
        console.log(error);
      });
  }

}
