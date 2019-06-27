import { CommonModule } from '@angular/common';
import { NgModule } from '@angular/core';
import { ReactiveFormsModule } from '@angular/forms';
import { SharedModule } from '../shared/shared.module';
import { AdminMatchEditComponent } from './admin-match-edit/admin-match-edit.component';
import { AdminMatchNewComponent } from './admin-match-new/admin-match-new.component';
import { AdminMatchesPageComponent } from './admin-matches-page/admin-matches-page.component';
import { AdminRoutingModule } from './admin-routing.module';
import { AdminTeamEditComponent } from './admin-team-edit/admin-team-edit.component';
import { AdminTeamLineComponent } from './admin-team-line/admin-team-line.component';
import { AdminTeamNewComponent } from './admin-team-new/admin-team-new.component';
import { AdminTeamViewComponent } from './admin-team-view/admin-team-view.component';
import { AdminTeamsPageComponent } from './admin-teams-page/admin-teams-page.component';
import { AdminMatchLineComponent } from './admin-match-line/admin-match-line.component';
import { AdminMatchViewComponent } from './admin-match-view/admin-match-view.component';

@NgModule({
    declarations: [
        AdminTeamsPageComponent,
        AdminMatchesPageComponent,
        AdminTeamEditComponent,
        AdminTeamNewComponent,
        AdminMatchNewComponent,
        AdminMatchEditComponent,
        AdminTeamViewComponent,
        AdminTeamLineComponent,
        AdminMatchLineComponent,
        AdminMatchViewComponent
    ],
    imports: [CommonModule, AdminRoutingModule, ReactiveFormsModule, SharedModule]
})
export class AdminModule {}
