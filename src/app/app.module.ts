import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';
import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { NgbModule } from '@ng-bootstrap/ng-bootstrap';
import { MomentModule } from 'ngx-moment';
import { HomePageComponent } from './home-page/home-page.component';
import { InformationPageComponent } from './information-page/information-page.component';
import { AngularFireModule } from 'angularfire2';
import { AngularFireDatabaseModule, AngularFireDatabase } from 'angularfire2/database';
import { AngularFireAuthModule } from 'angularfire2/auth';
import { environment } from '../environments/environment';
import { MatchesComponent } from './matches/matches.component';
import { TeamsComponent } from './teams/teams.component';
import { GroupsComponent } from './groups/groups.component';
import { TeamDetailsComponent } from './team-details/team-details.component';
import { MatchListComponent } from './match-list/match-list.component';
import { TableViewComponent } from './table-view/table-view.component';
import { TableViewPageComponent } from './table-view-page/table-view-page.component';
import { MatchPlayComponent } from './match-play/match-play.component';
import { ReglementComponent } from './reglement/reglement.component';
import { EmailComponent } from './email/email.component';
import { ReactiveFormsModule } from '@angular/forms';

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
        NgbModule.forRoot()
    ],
    providers: [],
    bootstrap: [AppComponent]
})
export class AppModule {}
