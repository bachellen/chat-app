import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';


import { AngularFireModule } from '@angular/fire/compat';
import { AngularFireAuthModule } from '@angular/fire/compat/auth';
import { environment } from '../environments/environment';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { FormsModule } from '@angular/forms';
import { SocketIoModule, SocketIoConfig } from 'ngx-socket-io';

import { HTTP_INTERCEPTORS, HttpClientModule } from '@angular/common/http';
import { AuthInterceptor } from './interceptors/auth.interceptor';
import { NbThemeModule } from '@nebular/theme';
import { ChatModule } from '@progress/kendo-angular-conversational-ui';
import { provideAnimationsAsync } from '@angular/platform-browser/animations/async';

const config: SocketIoConfig = { url: 'http://localhost:5001', options: {} };


@NgModule({
  declarations: [
    AppComponent
  ],
  imports: [
    AngularFireModule.initializeApp(environment.firebaseConfig),
    AngularFireAuthModule, // imports firebase/auth, only needed for auth features
    FormsModule,
    BrowserModule,
    AppRoutingModule,
    BrowserAnimationsModule  ,
    ChatModule,
    HttpClientModule,
    NbThemeModule.forRoot(),
    SocketIoModule.forRoot(config)
    
  ],
  providers: [ { provide: HTTP_INTERCEPTORS, useClass: AuthInterceptor, multi: true }, provideAnimationsAsync(),],
  bootstrap: [AppComponent]
})
export class AppModule { }
