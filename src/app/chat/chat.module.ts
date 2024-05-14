import { NgModule, CUSTOM_ELEMENTS_SCHEMA } from '@angular/core';
import { CommonModule } from '@angular/common';

import { ChatRoutingModule } from './chat-routing.module';
import { ChatViewComponent } from './chat-view/chat-view.component';
import { UserSidebarComponent } from './user-sidebar/user-sidebar.component';
import { NbChatModule } from '@nebular/theme';
import { ConversationalUIModule } from '@progress/kendo-angular-conversational-ui';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';




@NgModule({
  declarations: [
    ChatViewComponent,
    UserSidebarComponent
  ],
  imports: [
    CommonModule,
    ChatRoutingModule,
    NbChatModule,
    ConversationalUIModule,
    // BrowserAnimationsModule
  ]
})
export class ChatModule { }
