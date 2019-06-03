import { CommonModule } from '@angular/common';
import { NgModule } from '@angular/core';
import { MomentModule } from 'ngx-moment';
import { AppRoutingModule } from '../app-routing.module';
import { GroupsComponent } from './groups/groups.component';
import { MatchListComponent } from './match-list/match-list.component';
import { MatchesComponent } from './matches/matches.component';
import { TableViewPageComponent } from './table-view-page/table-view-page.component';
import { TableViewComponent } from './table-view/table-view.component';
import { TeamDetailsComponent } from './team-details/team-details.component';
import { TeamsComponent } from './teams/teams.component';

@NgModule({
    declarations: [
        MatchesComponent,
        TeamsComponent,
        GroupsComponent,
        TeamDetailsComponent,
        MatchListComponent,
        TableViewComponent,
        TableViewPageComponent
    ],
    imports: [CommonModule, MomentModule, AppRoutingModule],
    exports: [MatchListComponent]
})
export class ResultsModule {}
