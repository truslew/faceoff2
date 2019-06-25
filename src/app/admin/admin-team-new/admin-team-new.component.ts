import { Component, OnInit } from '@angular/core';
import { TeamDaoEx } from 'src/app/shared/models/team';

@Component({
    selector: 'app-admin-team-new',
    templateUrl: './admin-team-new.component.html',
    styleUrls: ['./admin-team-new.component.scss']
})
export class AdminTeamNewComponent implements OnInit {
    public team: TeamDaoEx;

    constructor() {
    }

    ngOnInit() {
        this.team = {
            id: null,
            name: null,
            ageClassId: null,
            groupId: null,
            ident: null,
            weight: 0
        };

    }
}
