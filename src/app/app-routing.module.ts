import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { EmailComponent } from './email/email.component';
import { HomePageComponent } from './home-page/home-page.component';
import { InformationPageComponent } from './information-page/information-page.component';
import { MatchPlayComponent } from './match-play/match-play.component';
import { ReglementComponent } from './reglement/reglement.component';
import { GroupsComponent } from './results/groups/groups.component';
import { MatchesComponent } from './results/matches/matches.component';
import { TableViewPageComponent } from './results/table-view-page/table-view-page.component';
import { TeamDetailsComponent } from './results/team-details/team-details.component';
import { TeamsComponent } from './results/teams/teams.component';

const routes: Routes = [
    { path: 'hjem', component: HomePageComponent },
    { path: 'informasjon', component: InformationPageComponent },
    { path: 'lag', component: TeamsComponent },
    { path: 'lag-detaljer', component: TeamDetailsComponent },
    { path: 'grupper', component: GroupsComponent },
    { path: 'kamper', component: MatchesComponent },
    { path: 'tabeller', component: TableViewPageComponent },
    { path: 'reglement', component: ReglementComponent },
    { path: 'login', component: EmailComponent },
    { path: 'match-play', component: MatchPlayComponent },
    {
        path: 'admin',
        loadChildren: () => import('./admin/admin.module').then(mod => mod.AdminModule)
    },
    { path: '', redirectTo: 'hjem', pathMatch: 'full' },
    { path: '**', redirectTo: 'hjem', pathMatch: 'full' }
];

@NgModule({
    imports: [RouterModule.forRoot(routes)],
    exports: [RouterModule]
})
export class AppRoutingModule {}
