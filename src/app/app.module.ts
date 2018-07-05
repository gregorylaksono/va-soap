import { BrowserModule } from '@angular/platform-browser';
import { NgModule, Component } from '@angular/core';
import {BrowserAnimationsModule} from '@angular/platform-browser/animations';

import { AppComponent } from './app.component';
import { MainComponent } from './comp/main/main.component';
import { QueryComponent } from './comp/query/query.component';
import {HttpClientModule} from '@angular/common/http';
import { Routes, RouterModule } from '@angular/router';
import {MatDialogModule} from '@angular/material';

import { SimpleMessageComponent } from './dialog/simple-message/simple-message.component';
import { FormsModule } from '@angular/forms';
const appRoutes : Routes = [
  {path:'main', component: MainComponent},
  {path:'query', component: QueryComponent}
];
@NgModule({
  declarations: [
    AppComponent,
    MainComponent,
    QueryComponent,
    SimpleMessageComponent
  ],
  imports: [
    BrowserModule,
    HttpClientModule,
    MatDialogModule,
    BrowserAnimationsModule,
    FormsModule,
    RouterModule.forRoot(appRoutes) 
  ],
  providers: [],
  entryComponents:[SimpleMessageComponent],
  bootstrap: [AppComponent]
})
export class AppModule { }
