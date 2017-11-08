import { Injectable } from '@angular/core';
import { Http, Headers, RequestOptions } from '@angular/http';
import 'rxjs/add/operator/map';


@Injectable()
export class RestProvider {
  // private url:string = "http://127.0.0.1:8000/";//Url sem o caminho para os recursos da api
  private url:string = "https://smarket.lumal21.net.br/";//Url sem o caminho para os recursos da api
  constructor(public http: Http) {
    
  }

  //Requisição do logout
  postLogout(token: string){
    var path = "logout/";
    var header = {
      label: "Authorization",
      content: "Token " + token
    }
    return this.postRequest(path, "", header);
  }
  //Requisição do produto
  postProduto(data:any){
    var path = "product/scanner/"
    return this.postRequest(path, data);
  }


  //Requisição para cadastro
  postCadastro(data:any){
    var path = "user/";
    return this.postRequest(path, data);
  }

  //Requisição para logis
  postLogin(data:any){
    var path = "login/";
    return this.postRequest(path, data);
  }

  //Método base para qualquer requisição get
  private getRequest(path:string){
    return this.http.get(this.url + path)
      .map(res => res.json());
  }

  //Método base para qualquer requisição post
  private postRequest(path:string, data:any, header?: any){
    let headers = new Headers();
    if(header){
      console.log("logout");
      headers.append(header.label, header.content);
    }
    headers.append('Content-Type', 'application/json');
    let options = new RequestOptions({headers : headers});
    return this.http.post(this.url + path, data, options)
        .map(res => res.json());
  }

}


