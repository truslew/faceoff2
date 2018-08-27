import { Component, OnInit } from '@angular/core';
import { Title } from '@angular/platform-browser';

@Component({
    selector: 'app-reglement',
    templateUrl: './reglement.component.html',
    styleUrls: ['./reglement.component.scss']
})
export class ReglementComponent implements OnInit {
    constructor(titleService: Title) {
        titleService.setTitle('Reglement | Face Off');
    }

    ngOnInit() {}
}
