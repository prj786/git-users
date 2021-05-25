import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { LoaderComponent } from './components/loader/loader.component';
import { UsersComponent } from './routes/users/users.component';
import { InfoComponent } from './components/info/info.component';
import { PaginationComponent } from './components/pagination/pagination.component';
import { ReposComponent } from './routes/repos/repos.component';
import { HttpClientModule, HTTP_INTERCEPTORS } from '@angular/common/http';
import { Interceptor } from './services/interceptor.service';
import { DropdownComponent } from './components/dropdown/dropdown.component';
import {FormsModule} from '@angular/forms';
import {FontAwesomeModule} from '@fortawesome/angular-fontawesome';

@NgModule({
  declarations: [
    AppComponent,
    LoaderComponent,
    UsersComponent,
    InfoComponent,
    PaginationComponent,
    ReposComponent,
    DropdownComponent
  ],
    imports: [
      BrowserModule,
      AppRoutingModule,
      HttpClientModule,
      FormsModule,
      FontAwesomeModule,
    ],
  providers: [
    { provide: HTTP_INTERCEPTORS, useClass: Interceptor, multi: true }
  ],
  bootstrap: [AppComponent]
})
export class AppModule { }
