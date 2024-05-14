// ChatRoutingModule (chat-routing.module.ts)
import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { ChatViewComponent } from './chat-view/chat-view.component';

const routes: Routes = [
  { path: '', component: ChatViewComponent }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class ChatRoutingModule {}
