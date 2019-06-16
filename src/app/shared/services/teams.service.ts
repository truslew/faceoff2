import { Injectable } from '@angular/core';
import { AngularFirestore } from '@angular/fire/firestore';
import { TeamDao, TeamDaoEx } from '../models/team';
import { CollectionBase } from './collection-base';

@Injectable({
    providedIn: 'root'
})
export class TeamsService extends CollectionBase<TeamDao, TeamDaoEx> {
    constructor(protected fireStore: AngularFirestore) {
        super(fireStore, 'teams');
    }
}
