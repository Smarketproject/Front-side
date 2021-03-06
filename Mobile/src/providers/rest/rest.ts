import { Injectable } from '@angular/core';
import { Http, Headers, RequestOptions } from '@angular/http';
import 'rxjs/add/operator/map';

/*
    Todas as requisições Http devem ser declaradas aqui para que qualquer parte do código ao importar esse provider tenha acesso à esse métodos e não precise
  reescreve-los.
    Os métodos postRequest(path:string, data:any, header?: any) e getRequest(path:string) ajudam os outros métodos diminuindo a reescrita já que sem eles
  em todos os outros métodos teriam que ter o que eles já tem. Os dois recebem o parâmetro path que é o caminho que completa a url do serviço. 
  Apenas o postRequest tem o parâmetro data:any que o dado que é o payload da mensagem e o parâmetro opcional header:any que é para adicionar um header à mensagem.
    Os outros métodos usam os outros dois como uma forma de simplificar para quem usar esse métodos. O path já deve ser escrito dentro do path para que que for usá-lo não precise
  lembra, as únicas coisas que serão passadas ao método será o que é variável como o payload ou o token para o cabeçalho.
*/
@Injectable()
export class RestProvider {
  // private url:string = "http://127.0.0.1:8000/";//Url sem o caminho para os recursos da api (servidor local)
  // private url:string = "http://10.42.0.1:8000/";//Url sem o caminho para os recursos da api (servidor local)
  // private url:string = "https://smarket.lumal21.net.br/";//Url sem o caminho para os recursos da api (servidor remoto)
  private url:string = "https://homol.redes.unb.br/ptr022017B/";//Url sem o caminho para os recursos da api (servidor remoto)
  
  constructor(public http: Http) {
    
  }

  //Requisição para requisitar a url do pagseguro
  getRequisitarUrl(token: string, id: number){
    let path = "finalizando/" + id + "/pagseguro/";
    var header = {
      label: "Authorization",
      content: "Token " + token
    }
    return this.getRequest(path, header);
  }
  //Requisição para finalizar
  postFinalizarCompra(token: string, data: any){
    var path = "cart/";
    var header = {
      label: "Authorization",
      content: "Token " + token
    }
    return this.postRequest(path, data, header);
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

  //Requisição para atualizar cadastro
  postAtualizar(data:any, token: string){
    var path = "userup/";
    var header = {
      label: "Authorization",
      content: "Token " + token
    }
    return this.postRequest(path, data, header);
  }

  //Requisição para mostrar compras
  getCompras(token: string){
    let path= "purchase/show/";
    var header = {
      label: "Authorization",
      content: "Token " + token
    }
    return this.getRequest(path, header);
  }
  
  //Requisição para mostrar compra
  getCompra(token: string, cart_id){
    let path= "cart/" + cart_id + "/";
    var header = {
      label: "Authorization",
      content: "Token " + token
    }
    return this.getRequest(path, header);
  }

  //Método base para qualquer requisição get
  private getRequest(path:string, header?: any){
    let headers = new Headers();
    if(header){
      headers.append(header.label, header.content);
    }
    headers.append('Content-Type', 'application/json');
    let options = new RequestOptions({headers : headers});
    return this.http.get(this.url + path, options)
      .map(res => res.json());
  }

  //Método base para qualquer requisição post
  private postRequest(path:string, data:any, header?: any){
    let headers = new Headers();
    if(header){
      headers.append(header.label, header.content);
    }
    headers.append('Content-Type', 'application/json');
    let options = new RequestOptions({headers : headers});
    return this.http.post(this.url + path, data, options)
        .map(res => res.json());
  }

  public getUrl(){
    return this.url;
  }
}


