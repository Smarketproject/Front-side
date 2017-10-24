import { Injectable } from '@angular/core';
import { Http, Headers, RequestOptions } from '@angular/http';
import 'rxjs/add/operator/map';


@Injectable()
export class RestProvider {
  private url:string = "http://127.0.0.1:8000/";//Url sem o caminho para os recursos da api
  constructor(public http: Http) {
    
  }

  //Requisição para cadastro
  postCadastro(data:any){
    var path = "post";
    return this.postRequest(path, data);
  }

  //Requisição para cadastro
  postLogin(data:any){
    var path = "login";
    return this.postRequest(path, data);
  }

  //Método base para qualquer requisição get, retorna uma respota em json
  private getRequest(path:string){
    return this.http.get(this.url + path + "/")
      .map(res => res.json());
  }

  //Método base para qualquer requisição post, retorna uma respota em json
  private postRequest(path:string, data:any){
    let headers = new Headers();
    headers.append('Content-Type', 'application/json');
    let options = new RequestOptions({headers : headers});
    return this.http.post(this.url + path + "/", data, options)
        .map(res => res.json());
  }

}


