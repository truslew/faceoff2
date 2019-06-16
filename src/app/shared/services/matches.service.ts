import { Injectable } from '@angular/core';
import { AngularFirestore } from '@angular/fire/firestore';
import { MatchDao, MatchDaoEx } from '../models/match';
import { CollectionBase } from './collection-base';

@Injectable({
    providedIn: 'root'
})
export class MatchesService extends CollectionBase<MatchDao, MatchDaoEx> {
    constructor(protected fireStore: AngularFirestore) {
        super(fireStore, 'matches');
    }
}
