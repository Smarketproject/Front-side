import { Component } from '@angular/core';
import { IonicPage, NavController, NavParams } from 'ionic-angular';
import { RestProvider } from '../../providers/rest/rest';

@IonicPage()
@Component({
  selector: 'page-cadastro',
  templateUrl: 'cadastro.html',
})
export class CadastroPage {
  account ={
    username: "",
    email: "",
    cpf: "",
    password: "",
    confirm:""
  }
  constructor(public navCtrl: NavController, public navParams: NavParams, public rest: RestProvider) {
  }

  ionViewDidLoad() {
    
  }

  doSignup(){
    var validation = this.passwordValidation(this.account.password,this.account.confirm);
    if(validation){
      this.doRequest();
    }else{
      //mostrar mensagem de erro 
    }
  }
  
  private doRequest(){
    var data = {
      username: this.account.username,
      email: this.account.email,
      cpf: this.account.cpf,
      password: this.account.password
    }
    this.rest.postCadastro(data)
      .subscribe(data=>{
        console.log(data);
      });
  }

  private passwordValidation(password, confirm){
    if(password == confirm){
      return true;
    }
    return false;
  }
}
