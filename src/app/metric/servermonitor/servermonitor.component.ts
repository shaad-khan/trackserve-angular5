import { Component, OnInit, ViewChild } from '@angular/core';
import {ServermdataService} from "./servermdata.service";
import 'rxjs/Rx';
import { ActivatedRoute } from '@angular/router';
import {Observable} from 'rxjs/Rx';
import { IntervalObservable } from "rxjs/observable/IntervalObservable";
import {NgbModal, ModalDismissReasons} from '@ng-bootstrap/ng-bootstrap';
import { BaseChartDirective } from 'ng2-charts/ng2-charts';
@Component({
  selector: 'app-servermonitor',
  templateUrl: './servermonitor.component.html',
  styleUrls: ['./servermonitor.component.css'],
  providers:[ServermdataService]
})
export class ServermonitorComponent implements OnInit {
public loadf:boolean=true;
public client;
public cpudata;
public diskdata;
public imodalsub;
public data;
public results;
public chartdata:Array<any> = [{data: [], label: 'CPU'}];
  public chartlabel:Array<any> = [];
  public show: boolean = false;
  
  @ViewChild("baseChart") chart: BaseChartDirective;
  constructor(private route: ActivatedRoute,private _serdata:ServermdataService) { }

  ngOnInit() {
     
this.route.params.subscribe(params => {
       this.client = params['client'];
this.client=capitalizeFirstLetter(this.client);
       function capitalizeFirstLetter(string) {
    return string.charAt(0).toUpperCase() + string.slice(1);
       }
 
  });


  this._serdata.cpuinfo(this.client,1)
       // only gets fired once
      .subscribe((data) => {
        this.cpudata = data;
        
      });

//this.imain=this.getdata();

}
/*---------------------------------------------------------------------*/

public loadgraph():void
{
  console.log("loadgraph");
//this.http.get('http://nodeappservice.azurewebsites.net/cpu/'+ this.servername+'/10').subscribe(data => {
         this._serdata.cpuinfo(this.client,10)
       // only gets fired once
      .subscribe((data) => {
        this.results = data;
        
      }); 
      console.log("len"+this.results.length);
       
        for (let i = 0; i < this.results.length; i++)
          {
            this.chartdata[0].data[i] = this.results[i].Data;
            this.chartlabel[i] = new Date(this.results[i].Date).getMinutes();
          }
        console.log(this.chartlabel);
        if (this.chart !== undefined) {
          this.chart.chart.destroy();
          this.chart.chart = 0;
   
          this.chart.datasets = this.chartdata;
          this.chart.labels = this.chartlabel;
          this.chart.ngOnInit();
       }
        this.show = true;
        
}

 ngOnChanges(): void {
    setInterval(()=>{
      
        this._serdata.cpuinfo(this.client,10)
       // only gets fired once
      .subscribe((data) => {
        this.results = data;
        
      });  
        
        for (let i = 0; i < this.results.length; i++)
          {
            this.chartdata[0].data[i] = this.results[i].Data;
            this.chartlabel[i] = this.results[i].Dtime;
          }
        console.log(this.chartlabel);
        this.show = true;
       
    },6000);
    
  }
public lineChartData:Array<any> = [
    {data: [65, 59, 80, 81, 56, 55, 40,56, 55, 40,50], label: 'CPU'},
    {data: [28, 48, 40, 19, 86, 27, 90,56, 55, 40,50], label: 'MEMORY'},
   
  ];
  public lineChartLabels:Array<any> = ['10 min', '15 min', '20 min', '25 min', '30 min', '35 min', '40 min','45 min','50 min','55 min','60 min'];
  public lineChartOptions:any = {
    responsive: true
  };
  public lineChartColors:Array<any> = [
    { // grey
      backgroundColor: 'rgba(148,159,177,0.2)',
      borderColor: 'rgba(148,159,177,1)',
      pointBackgroundColor: 'rgba(148,159,177,1)',
      pointBorderColor: '#fff',
      pointHoverBackgroundColor: '#fff',
      pointHoverBorderColor: 'rgba(148,159,177,0.8)'
    },
    { // dark grey
      backgroundColor: 'rgba(77,83,96,0.2)',
      borderColor: 'rgba(77,83,96,1)',
      pointBackgroundColor: 'rgba(77,83,96,1)',
      pointBorderColor: '#fff',
      pointHoverBackgroundColor: '#fff',
      pointHoverBorderColor: 'rgba(77,83,96,1)'
    },
    { // grey
      backgroundColor: 'rgba(148,159,177,0.2)',
      borderColor: 'rgba(148,159,177,1)',
      pointBackgroundColor: 'rgba(148,159,177,1)',
      pointBorderColor: '#fff',
      pointHoverBackgroundColor: '#fff',
      pointHoverBorderColor: 'rgba(148,159,177,0.8)'
    }
  ];
  public lineChartLegend:boolean = true;
  public lineChartType:string = 'line';
 
  public randomize():void {
    let _lineChartData:Array<any> = new Array(this.lineChartData.length);
    for (let i = 0; i < this.lineChartData.length; i++) {
      _lineChartData[i] = {data: new Array(this.lineChartData[i].data.length), label: this.lineChartData[i].label};
      for (let j = 0; j < this.lineChartData[i].data.length; j++) {
        _lineChartData[i].data[j] = Math.floor((Math.random() * 100) + 1);
      }
    }
    this.lineChartData = _lineChartData;
  }
 
  // events
  public chartClicked(e:any):void {
    console.log(e);
  }
 
  public chartHovered(e:any):void {
    console.log(e);
  }


/*------------------------------------------------------------------*/

 getd(type:string)
  {
   
//this.imain.unsubscribe();
     setTimeout(()=>{    //<<<---    using ()=> syntax
      this.loadf = false;
 },3000);
    //this.gtype=type;

    if(type=='cpu')
    {
    this._serdata.cpuinfo(this.client,1)
       // only gets fired once
      .subscribe((data) => {
        this.cpudata = data;
        
      });

this.imodalsub=IntervalObservable.create(3000) // only fires when component is alive
      .subscribe(() => {
        this._serdata.cpuinfo(this.client,1)
          .subscribe(data => {
           // this.zone.run(() => {
             
            this.cpudata = data;
           // this.ref.detectChanges();
            //})
            //console.log(this.appData);
          
          });
      });
    }
    else if(type='disk')
    {
      this._serdata.diskinfo(this.client)
       // only gets fired once
      .subscribe((data) => {
        this.diskdata = data;
        
      });

/*this.imodalsub=IntervalObservable.create(3000) // only fires when component is alive
      .subscribe(() => {
        this._serdata.diskinfo(this.client)
          .subscribe(data => {
           // this.zone.run(() => {
             
            this.cpudata = data;
           // this.ref.detectChanges();
            //})
            //console.log(this.appData);
          
          });
      });*/

    }
  }
moreinfo(c,sern)
{
 // console.log(c+sern);
 //this.data=c+sern;
  this.loadgraph();
    setInterval(()=>{
      this.loadgraph();
    },30000)
}
mclose()
  {
   
     this.loadf=true;
  //this.imodalsub.unsubscribe();
  //this.imain=this.getdata();

  }


}