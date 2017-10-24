import { BrowserModule } from '@angular/platform-browser';
import { ErrorHandler, NgModule } from '@angular/core';
import { IonicApp, IonicErrorHandler, IonicModule } from 'ionic-angular';
import { SplashScreen } from '@ionic-native/splash-screen';
import { StatusBar } from '@ionic-native/status-bar';

import { MyApp } from './app.component';
import { MenuPage } from '../pages/menu/menu';
import { CadastroPage } from '../pages/cadastro/cadastro';
import { LoginPage } from '../pages/login/login';
import { RestProvider } from '../providers/rest/rest';
import { HttpModule } from '@angular/http';


import { BarcodeScanner } from '@ionic-native/barcode-scanner';
import { NgxQRCodeModule } from 'ngx-qrcode2';
import { CarrinhoPage } from '../pages/carrinho/carrinho';
import { HistoricoPage } from '../pages/historico/historico';

@NgModule({
  declarations: [
    MyApp,
    MenuPage,
    CadastroPage,
    LoginPage,
    CarrinhoPage,
    HistoricoPage
  ],
  imports: [
    BrowserModule,
    IonicModule.forRoot(MyApp),
    HttpModule,
    NgxQRCodeModule
  ],
  bootstrap: [IonicApp],
  entryComponents: [
    MyApp,
    LoginPage,
    MenuPage,
    CadastroPage,
    CarrinhoPage,
    HistoricoPage
  ],
  providers: [
    StatusBar,
    SplashScreen,
    {provide: ErrorHandler, useClass: IonicErrorHandler},
    RestProvider,
    BarcodeScanner
  ]
})
export class AppModule {}
