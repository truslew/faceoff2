import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { HomePageComponent } from './home-page/home-page.component';
import { InformationPageComponent } from './information-page/information-page.component';
import { TeamsComponent } from './teams/teams.component';
import { TeamDetailsComponent } from './team-details/team-details.component';
import { GroupsComponent } from './groups/groups.component';
import { MatchesComponent } from './matches/matches.component';
import { TableViewPageComponent } from './table-view-page/table-view-page.component';
import { MatchPlayComponent } from './match-play/match-play.component';
import { ReglementComponent } from './reglement/reglement.component';

const routes: Routes = [
    { path: 'hjem', component: HomePageComponent },
    { path: 'informasjon', component: InformationPageComponent },
    { path: 'lag', component: TeamsComponent },
    { path: 'lag-detaljer', component: TeamDetailsComponent },
    { path: 'grupper', component: GroupsComponent },
    { path: 'kamper', component: MatchesComponent },
    { path: 'tabeller', component: TableViewPageComponent },
    { path: 'reglement', component: ReglementComponent },
    // { path: 'login', component: EmailComponent },
    { path: 'match-play', component: MatchPlayComponent },

    { path: '', redirectTo: 'hjem', pathMatch: 'full' },
    { path: '**', redirectTo: 'hjem', pathMatch: 'full' }
];

@NgModule({
    imports: [RouterModule.forRoot(routes)],
    exports: [RouterModule]
})
export class AppRoutingModule {}
