import { Component } from '@angular/core';
import { IonicPage, NavController, NavParams, ToastController } from 'ionic-angular';
import { RestProvider } from '../../providers/rest/rest';
import { FormProvider } from '../../providers/form/form';

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
  constructor(
    public navCtrl: NavController, 
    public navParams: NavParams, 
    public rest: RestProvider,
    public form: FormProvider,
    public toastCtrl: ToastController
  ) {
  }

  ionViewDidLoad() {
    
  }

  doSignup(){
    var validation = this.form.passwordValidation(this.account.password,this.account.confirm);
    if(validation){
      this.doRequest();
    }else{
      this.form.presentToast(this.toastCtrl, "Senhas diferentes"); 
    }
  }

  private doRequest(){
    var data = {
      username: this.account.username,
      email: this.account.email,
      cpf: this.form.cpfUnmask,
      password: this.account.password
    }
    this.rest.postCadastro(data)
      .subscribe(data=>{
        console.log(data);
      });
  }

}
