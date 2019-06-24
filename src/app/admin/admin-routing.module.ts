import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { AdminTeamsPageComponent } from './admin-teams-page/admin-teams-page.component';
import { AdminMatchesPageComponent } from './admin-matches-page/admin-matches-page.component';

const routes: Routes = [
    { path: 'teams', component: AdminTeamsPageComponent },
    { path: 'matches', component: AdminMatchesPageComponent }
];

@NgModule({
    imports: [RouterModule.forChild(routes)],
    exports: [RouterModule]
})
export class AdminRoutingModule {}
