import { Component, OnInit } from '@angular/core';
import { MatchDaoEx } from 'src/app/shared/models/match';

@Component({
    selector: 'app-admin-match-new',
    templateUrl: './admin-match-new.component.html',
    styleUrls: ['./admin-match-new.component.scss']
})
export class AdminMatchNewComponent implements OnInit {
    public match: MatchDaoEx;

    constructor() {}

    ngOnInit() {
        this.match = {
            id: null,
            matchNo: null,
            start: null,
            ageClassId: null,
            groupId: null,
            ident1: null,
            ident2: null,
            groupLink1: null,
            groupLink2: null,
            matchLink1: null,
            matchLink2: null,
            text1: null,
            text2: null,
            description: null
        };
    }
}
