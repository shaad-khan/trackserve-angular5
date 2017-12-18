import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { AppComponent } from './app.component';
import { HeaderComponent } from './shared/header/header.component';
import { FooterComponent } from './shared/footer/footer.component';
import { MetricComponent } from './metric/metric.component';
import { ChartsModule } from 'ng2-charts';
import{HttpModule} from '@angular/http';
import { AppmonitorComponent } from './metric/appmonitor/appmonitor.component';
import {NgbModule} from '@ng-bootstrap/ng-bootstrap';
import { ServermonitorComponent } from './metric/servermonitor/servermonitor.component';
const appRoutes: Routes = [
{ path: 'metric/:client', component: MetricComponent },
/*{ path: 'config', component: ConfigComponent },
{ path: 'mconfig', component: MetriconfigComponent },*/


]
@NgModule({
  declarations: [
    AppComponent,
    HeaderComponent,
    FooterComponent,
    MetricComponent,
    AppmonitorComponent,
    ServermonitorComponent
  ],
  imports: [
    BrowserModule,ChartsModule,HttpModule,RouterModule.forRoot(
      appRoutes,{useHash: true}
      //{ enableTracing: true } // <-- debugging purposes only
    ),NgbModule.forRoot()
  ],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule { }
