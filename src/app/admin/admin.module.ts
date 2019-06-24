import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { AdminRoutingModule } from './admin-routing.module';
import { AdminTeamsPageComponent } from './admin-teams-page/admin-teams-page.component';
import { AdminMatchesPageComponent } from './admin-matches-page/admin-matches-page.component';
import { SharedModule } from '../shared/shared.module';

@NgModule({
    declarations: [AdminTeamsPageComponent, AdminMatchesPageComponent],
    imports: [CommonModule, AdminRoutingModule, SharedModule]
})
export class AdminModule {}
