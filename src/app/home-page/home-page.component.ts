import { Component, OnInit } from '@angular/core';
import { Title } from '@angular/platform-browser';
import { Match } from '../shared/models/match';
import { MatchStatus } from '../shared/models/result';
import { TeamsDataContext } from '../shared/models/teamsDataContext';
import { FaceoffDataService } from '../shared/services/faceoff-data.service';

@Component({
    selector: 'app-home-page',
    templateUrl: './home-page.component.html',
    styleUrls: ['./home-page.component.scss']
})
export class HomePageComponent implements OnInit {
    public matches: Match[] = [];

    constructor(private dataService: FaceoffDataService, titleService: Title) {
        titleService.setTitle('Face Off Cup - Asker IBK');
        dataService.teamsDataContext.subscribe(data => this.dataLoaded(data));
    }

    ngOnInit() {}

    private dataLoaded(dataContext: TeamsDataContext): void {
        this.matches = dataContext.matches.filter(m => m.status === MatchStatus.Current);
    }
}
