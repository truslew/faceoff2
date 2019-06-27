import { Component, Input, OnInit } from '@angular/core';
import { FormBuilder, FormControl, FormGroup, Validators } from '@angular/forms';
import { combineLatest, ReplaySubject } from 'rxjs';
import { filter, takeUntil } from 'rxjs/operators';
import { AgeClassDaoEx } from 'src/app/shared/models/ageClass';
import { GroupDaoEx } from 'src/app/shared/models/group';
import { MatchDaoEx, MatchDao } from 'src/app/shared/models/match';
import { AgeClassService } from 'src/app/shared/services/age-class.service';
import { GroupsService } from 'src/app/shared/services/groups.service';
import { MatchesService } from 'src/app/shared/services/matches.service';
import { ControlHelper } from '../control-helper';
import { LoadingStatusService } from '../services/loading-status.service';
import { TakeUntilBase } from '../TakeUntilBase';
import * as moment from 'moment';
import { GroupLinkDao } from 'src/app/shared/models/groupLink';
import { MatchLinkDao } from 'src/app/shared/models/matchLink';

@Component({
    selector: 'app-admin-match-view',
    templateUrl: './admin-match-view.component.html',
    styleUrls: ['./admin-match-view.component.scss']
})
export class AdminMatchViewComponent extends TakeUntilBase implements OnInit {
    @Input()
    public set match(value: MatchDaoEx) {
        this.match$.next(value);
    }

    public matchForm: FormGroup;

    public ageClasses: AgeClassDaoEx[] = [];
    public groups: GroupDaoEx[] = [];
    public matches: MatchDaoEx[] = [];

    public matchNo: ControlHelper<number>;
    public startTime: ControlHelper<string>;
    public ageClass: ControlHelper<AgeClassDaoEx>;
    public group: ControlHelper<GroupDaoEx>;
    public ident1: ControlHelper<string>;
    public ident2: ControlHelper<string>;
    public group1: ControlHelper<GroupDaoEx>;
    public group1Rank: ControlHelper<number>;
    public group2: ControlHelper<GroupDaoEx>;
    public group2Rank: ControlHelper<number>;
    public match1: ControlHelper<MatchDaoEx>;
    public match2: ControlHelper<MatchDaoEx>;
    public text1: ControlHelper<string>;
    public text2: ControlHelper<string>;
    public description: ControlHelper<string>;

    private match$ = new ReplaySubject<MatchDaoEx>(1);
    private matchId: string;

    constructor(
        private fb: FormBuilder,
        private matchesService: MatchesService,
        private ageClassService: AgeClassService,
        private groupService: GroupsService,
        public loadStatus: LoadingStatusService
    ) {
        super();
        this.initForm();
    }

    ngOnInit() {
        this.loadStatus.loadingStart();

        combineLatest(
            this.match$.pipe(filter(t => t != null)),
            this.ageClassService.all(),
            this.groupService.all(),
            this.matchesService.all()
        )
            .pipe(takeUntil(this.destroy$))
            .subscribe(([x, a, g, m]) => this.updateData(x, a, g, m), err => this.handleError(err));
    }

    public get filteredGroups(): GroupDaoEx[] {
        const a = this.ageClass.value;
        return a != null ? this.groups.filter(g => g.ageClassId === a.id) : [];
    }

    public get filteredMatches(): MatchDaoEx[] {
        const a = this.ageClass.value;
        return a != null ? this.matches.filter(g => g.ageClassId === a.id) : [];
    }

    private initForm(): void {
        this.matchForm = this.fb.group({
            matchNo: new FormControl(null, [Validators.required, Validators.min(0), Validators.max(100)]),
            start: new FormControl(null, [Validators.required]),
            ageClass: new FormControl(null, [Validators.required]),
            group: new FormControl(null),
            ident1: new FormControl(null, [Validators.maxLength(1)]),
            ident2: new FormControl(null, [Validators.maxLength(1)]),
            group1: new FormControl(null),
            group1Rank: new FormControl(null, [Validators.min(0), Validators.max(10)]),
            group2: new FormControl(null),
            group2Rank: new FormControl(null, [Validators.min(0), Validators.max(10)]),
            match1: new FormControl(null),
            match2: new FormControl(null),
            text1: new FormControl(null),
            text2: new FormControl(null),
            description: new FormControl(null)
        });

        this.matchNo = new ControlHelper<number>(this.matchForm, 'matchNo');
        this.startTime = new ControlHelper<string>(this.matchForm, 'start');
        this.ageClass = new ControlHelper<AgeClassDaoEx>(this.matchForm, 'ageClass');
        this.group = new ControlHelper<GroupDaoEx>(this.matchForm, 'group');
        this.ident1 = new ControlHelper<string>(this.matchForm, 'ident1');
        this.ident2 = new ControlHelper<string>(this.matchForm, 'ident2');
        this.group1 = new ControlHelper<GroupDaoEx>(this.matchForm, 'group1');
        this.group1Rank = new ControlHelper<number>(this.matchForm, 'group1Rank');
        this.group2 = new ControlHelper<GroupDaoEx>(this.matchForm, 'group1');
        this.group2Rank = new ControlHelper<number>(this.matchForm, 'group1Rank');
        this.match1 = new ControlHelper<MatchDaoEx>(this.matchForm, 'match1');
        this.match2 = new ControlHelper<MatchDaoEx>(this.matchForm, 'match2');
        this.text1 = new ControlHelper<string>(this.matchForm, 'text1');
        this.text2 = new ControlHelper<string>(this.matchForm, 'text2');
        this.description = new ControlHelper<string>(this.matchForm, 'description');
    }

    updateData(match: MatchDaoEx, ageClasses: AgeClassDaoEx[], groups: GroupDaoEx[], matches: MatchDaoEx[]): void {
        this.matchId = match.id;
        this.ageClasses = ageClasses;
        this.groups = groups;
        this.matches = matches;

        const ageClass = this.ageClasses.find(x => x.id === match.ageClassId);
        const group = this.groups.find(x => x.id === match.groupId);

        const group1 = match.groupLink1 != null ? this.groups.find(x => x.id === match.groupLink1.groupId) : null;
        const group2 = match.groupLink2 != null ? this.groups.find(x => x.id === match.groupLink2.groupId) : null;

        const match1 = match.matchLink1 != null ? this.matches.find(x => x.id === match.matchLink1.matchId) : null;
        const match2 = match.matchLink2 != null ? this.matches.find(x => x.id === match.matchLink2.matchId) : null;

        this.matchForm.reset({
            matchNo: match.matchNo,
            start: moment(match.start.seconds * 1000).format('YYYY-MM-DD HH:mm'),
            ageClass,
            group,
            ident1: match.ident1,
            ident2: match.ident2,
            group1,
            group1Rank: match.groupLink1 != null ? match.groupLink1.rank : null,
            group2,
            group2Rank: match.groupLink2 != null ? match.groupLink2.rank : null,
            match1,
            match2,
            text1: match.text1,
            text2: match.text2,
            description: match.description
        });

        this.loadStatus.loadingSuccess();
    }

    private handleError(error: any): void {
        this.loadStatus.loadingError('Loading failed, try again');
    }

    public get disableSave(): boolean {
        return this.matchForm.pristine || this.matchForm.invalid;
    }

    public formInvalid(): boolean {
        return this.matchForm.invalid;
    }

    public save(): void {
        if (!this.formInvalid) {
            return;
        }

        this.loadStatus.savingStart('Saving Match');

        const start = moment(this.startTime.value, 'YYYY-MM-DD HH:mm');

        const match: MatchDao = {
            matchNo: this.matchNo.intValue,
            start: start.isValid() ? start.toDate() : null,
            ageClassId: this.ageClass.value != null ? this.ageClass.value.id : null,
            groupId: this.group.value != null ? this.group.value.id : null,
            ident1: this.ident1.value,
            ident2: this.ident2.value,
            groupLink1: this.getGroupLink1(),
            groupLink2: this.getGroupLink2(),
            matchLink1: this.getMatchLink1(),
            matchLink2: this.getMatchLink2(),
            text1: this.text1.value,
            text2: this.text2.value,
            description: this.description.value,
        };

        if (this.matchId != null) {
            this.matchesService.addWithId(this.matchId, match).subscribe(() => this.handleSaveSuccess(), e => this.handleSaveError(e));
        } else {
            this.matchesService.add(match).subscribe(() => this.handleSaveSuccess(), e => this.handleSaveError(e));
        }
    }

    private getGroupLink1(): GroupLinkDao {
        const link = this.group1.value;
        if (link != null) {
            return {
                groupId: link.id,
                rank: this.group1Rank.value
            };
        }

        return null;
    }

    private getGroupLink2(): GroupLinkDao {
        const link = this.group2.value;
        if (link != null) {
            return {
                groupId: link.id,
                rank: this.group2Rank.value
            };
        }

        return null;
    }

    private getMatchLink1(): MatchLinkDao {
        const link = this.match1.value;
        if (link != null) {
            return {
                matchId: link.id
            };
        }

        return null;
    }


    private getMatchLink2(): MatchLinkDao {
        const link = this.match2.value;
        if (link != null) {
            return {
                matchId: link.id
            };
        }

        return null;
    }

    private handleSaveSuccess(): void {
        this.matchForm.markAsPristine();
        this.loadStatus.savingSuccess('Match Saved');
    }

    private handleSaveError(error: any): void {
        this.loadStatus.savingError();
    }
}
