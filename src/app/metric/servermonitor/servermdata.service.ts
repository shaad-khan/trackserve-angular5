import { Injectable } from '@angular/core';
import {Http,Response} from '@angular/http';
import {Observable} from 'rxjs/Observable';
import 'rxjs/add/operator/map';
@Injectable()
export class ServermdataService {

  constructor(private _http:Http) { }
  cpuinfo(x:String,token?:string|number)
  {
    
      if(token==null)
      {
      return this._http.get('http://40.112.219.53:30012/cpu/'+x)
      .map((res:Response)=>res.json());
    }
    else{
      return this._http.get('http://40.112.219.53:30012/cpu/'+x+'/'+token)
      .map((res:Response)=>res.json());
    }
  }
  diskinfo(x:String,token?:string|number)
  {
    
      if(token==null)
      {
      return this._http.get('http://40.112.219.53:30012/disk/'+x)
      .map((res:Response)=>res.json());
    }
    else{
      return this._http.get('http://40.112.219.53:30012/disk/'+x+'/'+token)
      .map((res:Response)=>res.json());
    }
  }

}
