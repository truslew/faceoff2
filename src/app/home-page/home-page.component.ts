import { Component, OnInit } from '@angular/core';
import { Title } from '@angular/platform-browser';
import { Match } from '../modes/match';
import { MatchStatus } from '../modes/result';
import { TeamsDataContext } from '../modes/teamsDataContext';
import { FaceoffDataService } from '../services/faceoff-data.service';

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
