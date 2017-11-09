import { Component } from '@angular/core';
import { IonicPage, NavController, NavParams, LoadingController } from 'ionic-angular';
import { LoginPage } from '../login/login';
import { HistoricoPage } from '../historico/historico';
import { CarrinhoPage } from '../carrinho/carrinho';
import { RestProvider } from '../../providers/rest/rest';
import { FormProvider } from '../../providers/form/form';

@IonicPage()
@Component({
  selector: 'page-menu',
  templateUrl: 'menu.html',
})
export class MenuPage {
  config: {};

  constructor(
    public navCtrl: NavController, 
    public navParams: NavParams,
    public rest: RestProvider,
    public loadingCtrl: LoadingController,
    public form: FormProvider
  ) {
    this.createConfig();
  }

  ionViewDidLoad() {

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
    let loading = this.loadingCtrl.create({
      content: "Saindo" 
    });
    loading.present();
  this.rest.postLogout(this.navParams.get('token')).subscribe(
      data=>{
        // console.log(data);
        loading.dismiss();
        this.navCtrl.setRoot(LoginPage);
      }, 
      error=>{
        loading.dismiss();
        if(error.status == 0){
          this.form.presentToast('Não foi possível conectar ao servidor, tente novamente.')
        }
      });
  }
  private createConfig(){
    this.config = {

    }
  }  
}
