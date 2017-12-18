import { Component, OnInit } from '@angular/core';
import {AppmonitordataService} from './appmonitordata.service';
import {Appmodel} from './appmodel';
import 'rxjs/Rx';
import { ActivatedRoute } from '@angular/router';
import {Observable} from 'rxjs/Rx';
import { IntervalObservable } from "rxjs/observable/IntervalObservable";
import {NgbModal, ModalDismissReasons} from '@ng-bootstrap/ng-bootstrap';
@Component({
  selector: 'app-appmonitor',
  templateUrl: './appmonitor.component.html',
  styleUrls: ['./appmonitor.component.css'],
  providers:[AppmonitordataService]
})
export class AppmonitorComponent implements OnInit {
  [x: string]: any;
  public appserverm: Appmodel;
  public sub;
  public client;
  public closeResult;
  public appdata:any;
  public gtype;
  public imodalsub;
  public loadf:boolean=true;
  public imain;
  constructor(private modalService: NgbModal,private _appdata:AppmonitordataService,private route: ActivatedRoute) { }

  ngOnInit() {
this.sub = this.route.params.subscribe(params => {
       this.client = params['client'];
this.client=capitalizeFirstLetter(this.client);
       function capitalizeFirstLetter(string) {
    return string.charAt(0).toUpperCase() + string.slice(1);
       }
});





this._appdata.appserverinfo(this.client)
       // only gets fired once
      .subscribe((data) => {
        this.appserverm = data;
        
      });

this.imain=this.getdata();





  }
/*-------------------------Function Call to IntervalObservable ---*/
getdata()
{
return IntervalObservable.create(3000) // only fires when component is alive
      .subscribe(() => {
        this._appdata.appserverinfo(this.client)
          .subscribe(data => {
            this.appserverm = data; 
          });
      });
}



  openc(type:string)
  {
   
this.imain.unsubscribe();
     setTimeout(()=>{    //<<<---    using ()=> syntax
      this.loadf = false;
 },3000);
    this.gtype=type;
    this._appdata.appserverinfo(this.client)
       // only gets fired once
      .subscribe((data) => {
        this.appdata = data;
        
      });

this.imodalsub=IntervalObservable.create(3000) // only fires when component is alive
      .subscribe(() => {
        this._appdata.appserverinfo(this.client,type)
          .subscribe(data => {
           // this.zone.run(() => {
             
            this.appdata = data;
           // this.ref.detectChanges();
            //})
            //console.log(this.appData);
          
          });
      });
  }

  mclose()
  {
   
     this.loadf=true;
  this.imodalsub.unsubscribe();
  this.imain=this.getdata();

  }



}
