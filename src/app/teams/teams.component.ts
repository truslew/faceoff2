import { Component, OnInit } from '@angular/core';
import { Title } from '@angular/platform-browser';
import { AgeClass } from '../modes/ageClass';
import { FaceoffDataService } from '../shared/services/faceoff-data.service';
import { TeamsDataContext } from '../modes/teamsDataContext';

@Component({
    selector: 'app-teams',
    templateUrl: './teams.component.html',
    styleUrls: ['./teams.component.scss']
})
export class TeamsComponent implements OnInit {
    public loading = true;

    public ageClasses: AgeClass[];

    constructor(titleService: Title, private dataService: FaceoffDataService) {
        titleService.setTitle('Påmeldte lag | Face Off');
        dataService.teamsDataContext.subscribe(data => this.dataLoaded(data));
    }

    ngOnInit() {}

    private dataLoaded(dataContext: TeamsDataContext): void {
        this.ageClasses = dataContext.ageClasses;
        this.loading = !dataContext.teamsReady;
    }
}
