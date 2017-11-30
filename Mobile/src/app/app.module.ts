import { BrowserModule } from '@angular/platform-browser';
import { ErrorHandler, NgModule } from '@angular/core';
import { IonicApp, IonicErrorHandler, IonicModule } from 'ionic-angular';
import { SplashScreen } from '@ionic-native/splash-screen';
import { StatusBar } from '@ionic-native/status-bar';
import { BarcodeScanner } from '@ionic-native/barcode-scanner';
import { HttpModule } from '@angular/http';

import { MyApp } from './app.component';
import { MenuPage } from '../pages/menu/menu';
import { CadastroPage } from '../pages/cadastro/cadastro';
import { LoginPage } from '../pages/login/login';
import { HistoricoPage } from '../pages/historico/historico';
import { AtualizarPage } from '../pages/atualizar/atualizar';

import { RestProvider } from '../providers/rest/rest';
import { FormProvider } from '../providers/form/form';
import { CarrinhoPage } from '../pages/carrinho/carrinho';
import { NgxQRCodeModule } from 'ngx-qrcode2';


@NgModule({
  declarations: [
    MyApp,
    MenuPage,
    CadastroPage,
    LoginPage,
    HistoricoPage,
    CarrinhoPage,
    AtualizarPage,
    
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
    HistoricoPage,
    CarrinhoPage,
    AtualizarPage,
  ],
  providers: [
    StatusBar,
    SplashScreen,
    {provide: ErrorHandler, useClass: IonicErrorHandler},
    RestProvider,
    FormProvider,
    BarcodeScanner
  ]
})
export class AppModule {}