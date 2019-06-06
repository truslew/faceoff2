import { Injectable } from '@angular/core';
import { AngularFirestore } from '@angular/fire/firestore';
import { AgeClassDao, AgeClassDaoEx } from '../models/ageClass';
import { CollectionBase } from './collection-base';

@Injectable({
    providedIn: 'root'
})
export class AgeClassService extends CollectionBase<AgeClassDao, AgeClassDaoEx> {
    constructor(protected fireStore: AngularFirestore) {
        super(fireStore, 'ageClasses');
    }
}
