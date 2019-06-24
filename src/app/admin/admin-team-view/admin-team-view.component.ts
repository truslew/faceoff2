import { Component, OnInit, Input } from '@angular/core';
import { TeamDaoEx } from 'src/app/shared/models/team';

@Component({
    selector: 'app-admin-team-view',
    templateUrl: './admin-team-view.component.html',
    styleUrls: ['./admin-team-view.component.scss']
})
export class AdminTeamViewComponent implements OnInit {
    @Input() team: TeamDaoEx;

    constructor() {}

    ngOnInit() {}
}
