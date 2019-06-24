import { NgModule } from '@angular/core';
import { AngularFireModule } from '@angular/fire';
import { AngularFireAuthModule } from '@angular/fire/auth';
import { AngularFireDatabaseModule } from '@angular/fire/database';
import { ReactiveFormsModule } from '@angular/forms';
import { BrowserModule } from '@angular/platform-browser';
import { NgbModule } from '@ng-bootstrap/ng-bootstrap';
import { MomentModule } from 'ngx-moment';
import { environment } from '../environments/environment';
import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { EmailComponent } from './email/email.component';
import { HomePageComponent } from './home-page/home-page.component';
import { InformationPageComponent } from './information-page/information-page.component';
import { MatchPlayComponent } from './match-play/match-play.component';
import { ReglementComponent } from './reglement/reglement.component';
import { ResultsModule } from './results/results.module';
import { SharedModule } from './shared/shared.module';

@NgModule({
    declarations: [AppComponent, HomePageComponent, InformationPageComponent, EmailComponent, MatchPlayComponent, ReglementComponent],
    imports: [
        BrowserModule,
        AppRoutingModule,
        ReactiveFormsModule,
        AngularFireModule.initializeApp(environment.firebase),
        AngularFireDatabaseModule,
        AngularFireAuthModule,
        MomentModule,
        NgbModule,
        SharedModule,
        ResultsModule
    ],
    providers: [],
    bootstrap: [AppComponent]
})
export class AppModule {}
