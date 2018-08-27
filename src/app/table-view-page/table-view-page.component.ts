import { Component, OnInit } from '@angular/core';
import { Router, ActivatedRoute, ParamMap } from '@angular/router';
import { Title } from '@angular/platform-browser';
import { Group } from '../modes/group';
import { FaceoffDataService } from '../services/faceoff-data.service';
import { TeamsDataContext } from '../modes/teamsDataContext';

@Component({
    selector: 'app-table-view-page',
    templateUrl: './table-view-page.component.html'
})
export class TableViewPageComponent implements OnInit {
    public groups: Group[];

    public loading = true;

    constructor(private titleService: Title, private dataService: FaceoffDataService) {
        titleService.setTitle('Tabeller | Face Off');
        dataService.teamsDataContext.subscribe(data => this.dataLoaded(data));
    }

    ngOnInit(): void {}

    private dataLoaded(dataContext: TeamsDataContext): void {
        this.groups = dataContext.groups.filter(g => g.hasMatches);

        this.loading = !dataContext.matchesReady;
    }
}
