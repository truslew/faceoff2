import { Component, OnInit, Input } from '@angular/core';
import { TeamDaoEx } from 'src/app/shared/models/team';
import { AgeClassService } from 'src/app/shared/services/age-class.service';
import { GroupsService } from 'src/app/shared/services/groups.service';
import { AgeClassDaoEx } from 'src/app/shared/models/ageClass';
import { GroupDaoEx } from 'src/app/shared/models/group';

@Component({
    selector: 'app-admin-team-line',
    templateUrl: './admin-team-line.component.html',
    styleUrls: ['./admin-team-line.component.scss']
})
export class AdminTeamLineComponent implements OnInit {
    @Input() team: TeamDaoEx;

    public ageClass: AgeClassDaoEx;
    public group: GroupDaoEx;

    constructor(private ageClassService: AgeClassService, private groupService: GroupsService) {}

    ngOnInit() {
        this.ageClassService.get(this.team.ageClassId).subscribe(a => (this.ageClass = a));
        this.groupService.get(this.team.groupId).subscribe(g => (this.group = g));
    }
}
