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
import { GroupsComponent } from './groups/groups.component';
import { HomePageComponent } from './home-page/home-page.component';
import { InformationPageComponent } from './information-page/information-page.component';
import { MatchListComponent } from './match-list/match-list.component';
import { MatchPlayComponent } from './match-play/match-play.component';
import { MatchesComponent } from './matches/matches.component';
import { ReglementComponent } from './reglement/reglement.component';
import { TableViewPageComponent } from './table-view-page/table-view-page.component';
import { TableViewComponent } from './table-view/table-view.component';
import { TeamDetailsComponent } from './team-details/team-details.component';
import { TeamsComponent } from './teams/teams.component';
import { SharedModule } from './shared/shared.module';

@NgModule({
    declarations: [
        AppComponent,
        HomePageComponent,
        InformationPageComponent,
        MatchesComponent,
        TeamsComponent,
        GroupsComponent,
        TeamDetailsComponent,
        MatchListComponent,
        TableViewComponent,
        TableViewPageComponent,
        EmailComponent,
        MatchPlayComponent,
        ReglementComponent
    ],
    imports: [
        BrowserModule,
        AppRoutingModule,
        ReactiveFormsModule,
        AngularFireModule.initializeApp(environment.firebase),
        AngularFireDatabaseModule,
        AngularFireAuthModule,
        MomentModule,
        NgbModule.forRoot(),
        SharedModule
    ],
    providers: [],
    bootstrap: [AppComponent]
})
export class AppModule {}
