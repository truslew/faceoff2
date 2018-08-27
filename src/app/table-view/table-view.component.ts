import { Component, OnInit, Input } from '@angular/core';
import { TableTeam } from '../modes/tableTeam';
import { FaceoffDataService } from '../services/faceoff-data.service';

@Component({
    selector: 'app-table-view',
    templateUrl: './table-view.component.html'
})
export class TableViewComponent implements OnInit {
    @Input() table: TableTeam[];

    public isHenning = false;

    constructor(private dataService: FaceoffDataService) {
        dataService.isHenning.subscribe(auth => (this.isHenning = auth));
    }

    ngOnInit() {}
}
