import { Component, OnInit } from '@angular/core';
import { Title } from '@angular/platform-browser';
import { Group } from '../../shared/models/group';
import { FaceoffDataService } from '../../shared/services/faceoff-data.service';
import { TeamsDataContext } from '../../shared/models/teamsDataContext';

@Component({
    selector: 'app-groups',
    templateUrl: './groups.component.html',
    styleUrls: ['./groups.component.scss']
})
export class GroupsComponent implements OnInit {
    public loading = true;

    public groups: Group[];

    constructor(titleService: Title, private dataService: FaceoffDataService) {
        titleService.setTitle('Gruppe inndeling | Face Off');
        dataService.teamsDataContext.subscribe(data => this.dataLoaded(data));
    }

    ngOnInit() {}

    private dataLoaded(dataContext: TeamsDataContext): void {
        this.groups = dataContext.groups.filter(g => g.teams != null && g.teams.length > 0);
        this.loading = !dataContext.teamsReady;
    }
}
