import { Component, OnInit, Input } from '@angular/core';
import { TeamDaoEx } from 'src/app/shared/models/team';
import { AgeClassService } from 'src/app/shared/services/age-class.service';
import { GroupsService } from 'src/app/shared/services/groups.service';
import { AgeClassDaoEx } from 'src/app/shared/models/ageClass';
import { GroupDaoEx } from 'src/app/shared/models/group';
import { TakeUntilBase } from '../TakeUntilBase';
import { takeUntil } from 'rxjs/operators';

@Component({
    selector: 'app-admin-team-line',
    templateUrl: './admin-team-line.component.html',
    styleUrls: ['./admin-team-line.component.scss']
})
export class AdminTeamLineComponent extends TakeUntilBase implements OnInit {
    @Input()
    public set team(value: TeamDaoEx) {
        this.teamInternal = value;
        this.updateQueries();
    }

    public get team(): TeamDaoEx {
        return this.teamInternal;
    }

    private teamInternal: TeamDaoEx;

    public ageClass: AgeClassDaoEx;
    public group: GroupDaoEx;

    constructor(private ageClassService: AgeClassService, private groupService: GroupsService) {
        super();
    }

    ngOnInit() {}

    private updateQueries(): void {
        this.start();

        this.ageClassService.get(this.team.ageClassId).pipe(takeUntil(this.destroy$)).subscribe(a => (this.ageClass = a));
        this.groupService.get(this.team.groupId).pipe(takeUntil(this.destroy$)).subscribe(g => (this.group = g));
    }
}
