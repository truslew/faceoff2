import { Injectable } from '@angular/core';
import { AngularFirestore } from '@angular/fire/firestore';
import { ResultDao, ResultDaoEx } from '../models/result';
import { CollectionBase } from './collection-base';

@Injectable({
    providedIn: 'root'
})
export class ResultsService extends CollectionBase<ResultDao, ResultDaoEx> {
    constructor(protected fireStore: AngularFirestore) {
        super(fireStore, 'results');
    }
}
