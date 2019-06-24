import { CommonModule } from '@angular/common';
import { NgModule } from '@angular/core';
import { SharedModule } from '../shared/shared.module';
import { AdminMatchEditComponent } from './admin-match-edit/admin-match-edit.component';
import { AdminMatchNewComponent } from './admin-match-new/admin-match-new.component';
import { AdminMatchesPageComponent } from './admin-matches-page/admin-matches-page.component';
import { AdminRoutingModule } from './admin-routing.module';
import { AdminTeamEditComponent } from './admin-team-edit/admin-team-edit.component';
import { AdminTeamNewComponent } from './admin-team-new/admin-team-new.component';
import { AdminTeamsPageComponent } from './admin-teams-page/admin-teams-page.component';


@NgModule({
    declarations: [
        AdminTeamsPageComponent,
        AdminMatchesPageComponent,
        AdminTeamEditComponent,
        AdminTeamNewComponent,
        AdminMatchNewComponent,
        AdminMatchEditComponent
    ],
    imports: [CommonModule, AdminRoutingModule, SharedModule]
})
export class AdminModule {}
