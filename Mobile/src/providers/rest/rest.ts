import { Injectable } from '@angular/core';
import { Http } from '@angular/http';
import 'rxjs/add/operator/map';


@Injectable()
export class RestProvider {
  private url:string = "";
  constructor(public http: Http) {
    
  }

  private getRequest(path:string){

  }

  private postRequest(path:string, data:any){
    
  }

}
