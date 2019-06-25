import { Component, Input, OnInit } from '@angular/core';
import { AbstractControl, FormBuilder, FormControl, FormGroup, Validators } from '@angular/forms';
import { combineLatest, Subject, ReplaySubject } from 'rxjs';
import { AgeClassDaoEx } from 'src/app/shared/models/ageClass';
import { GroupDaoEx } from 'src/app/shared/models/group';
import { TeamDaoEx, TeamDao } from 'src/app/shared/models/team';
import { AgeClassService } from 'src/app/shared/services/age-class.service';
import { GroupsService } from 'src/app/shared/services/groups.service';
import { TeamsService } from 'src/app/shared/services/teams.service';

@Component({
    selector: 'app-admin-team-view',
    templateUrl: './admin-team-view.component.html',
    styleUrls: ['./admin-team-view.component.scss']
})
export class AdminTeamViewComponent implements OnInit {
    @Input()
    public set team(value: TeamDaoEx) {
        this.team$.next(value);
    }

    public teamForm: FormGroup;

    public ageClasses: AgeClassDaoEx[] = [];
    public groups: GroupDaoEx[] = [];

    private team$ = new ReplaySubject<TeamDaoEx>(1);

    private teamId: string;

    constructor(
        private fb: FormBuilder,
        private teamsService: TeamsService,
        private ageClassService: AgeClassService,
        private groupService: GroupsService
    ) {}

    ngOnInit() {
        this.initForm();
        combineLatest(this.team$, this.ageClassService.all(), this.groupService.all()).subscribe(([t, a, g]) => this.updateData(t, a, g));
    }

    public get filteredGroups(): GroupDaoEx[] {
        const a = this.ageClassValue;
        return a != null ? this.groups.filter(g => g.ageClassId === a.id) : [];
    }

    private initForm(): void {
        const nameControl = new FormControl('', [Validators.required, Validators.minLength(3)]);

        const ageClassControl = new FormControl(null, [Validators.required]);
        const groupControl = new FormControl(null, [Validators.required]);

        this.teamForm = this.fb.group({
            name: nameControl,
            ageClass: ageClassControl,
            group: groupControl
        });
    }

    updateData(t: TeamDaoEx, a: AgeClassDaoEx[], g: GroupDaoEx[]): void {
        this.teamId = t.id;
        this.ageClasses = a;
        this.groups = g;

        const ageClass = this.ageClasses.find(x => x.id === t.ageClassId);
        const group = this.groups.find(x => x.id === t.groupId);

        this.teamForm.reset({
            name: t.name,
            ageClass: ageClass || null,
            group: group || null
        });
    }

    public get name(): AbstractControl {
        return this.teamForm.get('name');
    }

    public get nameValue(): string {
        const name = this.name;
        return name != null ? name.value : null;
    }

    public get nameInvalid(): boolean {
        return this.name.invalid && this.name.touched;
    }

    public get ageClass(): AbstractControl {
        return this.teamForm.get('ageClass');
    }

    public get ageClassValue(): AgeClassDaoEx {
        const ageClass = this.ageClass;
        return ageClass != null ? ageClass.value : null;
    }

    public get ageClassInvalid(): boolean {
        return this.ageClass.invalid && this.ageClass.touched;
    }

    public get group(): AbstractControl {
        return this.teamForm.get('group');
    }

    public get groupValue(): GroupDaoEx {
        const group = this.group;
        return group != null ? group.value : null;
    }

    public get groupInvalid(): boolean {
        return this.group.invalid && this.group.touched;
    }

    public get disableSave(): boolean {
        return this.teamForm.pristine || this.teamForm.invalid;
    }

    public formInvalid(): boolean {
        return this.teamForm.invalid;
    }

    public save(): void {
        if (!this.formInvalid) {
            return;
        }

        const team: TeamDao = {
            name: this.nameValue,
            ageClassId: this.ageClassValue != null ? this.ageClassValue.id : null,
            groupId: this.groupValue != null ? this.groupValue.id : null,
            ident: null,
            weight: 0
        };

        if (this.teamId != null) {
            const t = { id: this.teamId, ...team };
            this.teamsService.addWithId(t).subscribe(() => console.log('Saved'), err => console.log(err));
        } else {
            this.teamsService.add(team).subscribe();
        }
    }
}
