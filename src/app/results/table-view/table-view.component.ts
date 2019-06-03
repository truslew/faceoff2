import { Component, OnInit, Input } from '@angular/core';
import { TableTeam } from '../../shared/models/tableTeam';
import { FaceoffDataService } from '../../shared/services/faceoff-data.service';

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
