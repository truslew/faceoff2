import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';

import { NgbModule } from '@ng-bootstrap/ng-bootstrap';

import { HomePageComponent } from './home-page/home-page.component';
import { InformationPageComponent } from './information-page/information-page.component';

@NgModule({
    declarations: [AppComponent, HomePageComponent, InformationPageComponent],
    imports: [BrowserModule, AppRoutingModule, NgbModule.forRoot()],
    providers: [],
    bootstrap: [AppComponent]
})
export class AppModule {}
