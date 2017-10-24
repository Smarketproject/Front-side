import { Component } from '@angular/core';
import { IonicPage, NavController, NavParams } from 'ionic-angular';
import {Md5} from 'ts-md5/dist/md5';
import { RestProvider } from '../../providers/rest/rest';

@IonicPage()
@Component({
  selector: 'page-cadastro',
  templateUrl: 'cadastro.html',
})
export class CadastroPage {
  account ={
    name: "",
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
      name: this.account.name,
      email: this.account.email,
      cpf: this.account.cpf,
      password: Md5.hashStr(this.account.password)
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
