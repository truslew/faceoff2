import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { AdminMatchEditComponent } from './admin-match-edit/admin-match-edit.component';
import { AdminMatchNewComponent } from './admin-match-new/admin-match-new.component';
import { AdminMatchesPageComponent } from './admin-matches-page/admin-matches-page.component';
import { AdminTeamEditComponent } from './admin-team-edit/admin-team-edit.component';
import { AdminTeamNewComponent } from './admin-team-new/admin-team-new.component';
import { AdminTeamsPageComponent } from './admin-teams-page/admin-teams-page.component';

const routes: Routes = [
    { path: 'teams', component: AdminTeamsPageComponent },
    { path: 'team-new', component: AdminTeamNewComponent },
    { path: 'team-edit/:id', component: AdminTeamEditComponent },
    { path: 'matches', component: AdminMatchesPageComponent },
    { path: 'match-new', component: AdminMatchNewComponent },
    { path: 'match-edit/:id', component: AdminMatchEditComponent }
];

@NgModule({
    imports: [RouterModule.forChild(routes)],
    exports: [RouterModule]
})
export class AdminRoutingModule {}
