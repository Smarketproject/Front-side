import { Component } from '@angular/core';
import { Platform } from 'ionic-angular';
import { StatusBar } from '@ionic-native/status-bar';
import { SplashScreen } from '@ionic-native/splash-screen';
import { LoginPage } from '../pages/login/login';
import { MenuPage } from '../pages/menu/menu';
import { HistoricoPage } from '../pages/historico/historico';
import { AtualizarPage } from '../pages/atualizar/atualizar';

@Component({
  templateUrl: 'app.html'
})
export class MyApp {
  
  rootPage:any = LoginPage;

  constructor(platform: Platform, statusBar: StatusBar, splashScreen: SplashScreen) {
    platform.ready().then(() => {
        statusBar.styleDefault();
      splashScreen.hide();
    });
  }
}

