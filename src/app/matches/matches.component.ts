import { Component, OnInit } from '@angular/core';
import { Router, ActivatedRoute, ParamMap } from '@angular/router';
import { Title } from '@angular/platform-browser';
import { AgeClass } from '../modes/ageClass';
import { Group } from '../modes/group';
import { Match } from '../modes/match';
import { FaceoffDataService } from '../shared/services/faceoff-data.service';
import { TeamsDataContext } from '../modes/teamsDataContext';

@Component({
    selector: 'app-matches',
    templateUrl: './matches.component.html',
    styleUrls: ['./matches.component.scss']
})
export class MatchesComponent implements OnInit {
    public ageClasses: AgeClass[] = [];
    public groups: Group[] = [];
    public matches: Match[] = [];

    private activeClassId: number = null;
    private activeGroupId: number = null;

    public activeClass: AgeClass = null;
    public activeGroup: Group = null;

    public loading = true;

    constructor(
        private titleService: Title,
        private dataService: FaceoffDataService,
        private route: ActivatedRoute,
        private router: Router
    ) {
        titleService.setTitle('Kamp oppsett | Face Off');

        dataService.teamsDataContext.subscribe(data => this.dataLoaded(data));
    }

    ngOnInit(): void {
        const params$ = this.route.paramMap;

        params$.subscribe(p => this.groupChange(p));
    }

    public get groupFilters(): Group[] {
        // return this.groups.filter(g => g.ageClass.groups.filter(x => x.teams.length>0).length>1);
        return this.groups; // .filter(g => g.ageClass.groups.filter(x => x.teams.length>0).length>1);
    }

    private groupChange(params: ParamMap) {
        this.activeClassId = this.getParamNumber(params, 'class');
        this.activeGroupId = this.getParamNumber(params, 'group');

        this.initActiveGroup();
    }

    private getParamNumber(params: ParamMap, name: string): number {
        const id = parseInt(params.get(name), 10);
        return id > 0 ? id : null;
    }

    private initActiveGroup(): void {
        if (this.ageClasses != null && this.groups != null) {
            this.activeClass = this.ageClasses.find(c => c.id === this.activeClassId);
            this.activeGroup = this.groups.find(g => g.id === this.activeGroupId);

            if (this.activeGroup != null) {
                this.activeClass = this.activeGroup.ageClass;
                this.titleService.setTitle(`Kamp oppsett - ${this.activeGroup.name} | Face Off`);
                return;
            }

            if (this.activeClass != null) {
                this.titleService.setTitle(`Kamp oppsett - ${this.activeClass.name} | Face Off`);
                return;
            }
        }

        this.activeClass = null;
        this.activeGroup = null;
        this.titleService.setTitle(`Kamp oppsett | Face Off`);
    }

    public get groupPlay(): Match[] {
        if (this.matches != null) {
            if (this.activeGroup != null) {
                return this.matches.filter(
                    (m: Match) =>
                        m.ageClassId === this.activeClass.id && m.group != null && m.group.id === this.activeGroup.id
                );
            }

            if (this.activeClass != null) {
                return this.matches.filter((m: Match) => m.ageClassId === this.activeClass.id && m.group != null);
            }

            return this.matches.filter((m: Match) => m.group != null);
        }
        return [];
    }

    public get finals(): Match[] {
        if (this.matches != null) {
            if (this.activeClass != null) {
                return this.matches.filter((m: Match) => m.ageClassId === this.activeClass.id && m.group == null);
            }

            return this.matches.filter((m: Match) => m.group == null);
        }
        return [];
    }

    private dataLoaded(dataContext: TeamsDataContext): void {
        this.ageClasses = dataContext.ageClasses;
        this.groups = dataContext.groups.filter(g => g.teams != null && g.teams.length > 0);
        this.matches = dataContext.matches;

        this.initActiveGroup();

        this.loading = !dataContext.matchesReady;
    }
}
