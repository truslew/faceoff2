import { Injectable } from '@angular/core';
import { AngularFirestore, AngularFirestoreCollection, AngularFirestoreDocument } from '@angular/fire/firestore';
import { from, Observable } from 'rxjs';
import { map, switchMap } from 'rxjs/operators';
import { AgeClassDao, AgeClassDaoEx } from '../models/ageClass';

@Injectable({
    providedIn: 'root'
})
export class AgeClassService {
    constructor(private fireStore: AngularFirestore) {}

    public collection(): AngularFirestoreCollection<AgeClassDao> {
        return this.fireStore.collection('ageClasses');
    }

    public all(): Observable<AgeClassDaoEx[]> {
        return this.collection()
            .snapshotChanges()
            .pipe(
                map(actions => {
                    return actions.map(action => {
                        const data = action.payload.doc.data() as AgeClassDao;
                        const id = action.payload.doc.id;
                        return { id, ...data };
                    });
                })
            );
    }

    public getDoc(id: string): AngularFirestoreDocument<AgeClassDao> {
        return this.collection().doc(id);
    }

    public getData(document: AngularFirestoreDocument<AgeClassDao>): Observable<AgeClassDaoEx> {
        return document.snapshotChanges().pipe(
            map(s => {
                const data = s.payload.data() as AgeClassDao;
                const id = s.payload.id;
                return { id, ...data };
            })
        );
    }

    public get(id: string): Observable<AgeClassDaoEx> {
        return this.getData(this.getDoc(id));
    }

    public add(sponsor: AgeClassDao): Observable<AgeClassDaoEx> {
        return from(this.collection().add(sponsor)).pipe(
            switchMap(x => x.get()),
            map(s => {
                const data = s.data() as AgeClassDao;
                const id = s.id;
                return { id, ...data };
            })
        );
    }

    public addWithId(sponsor: AgeClassDaoEx): Observable<AgeClassDaoEx> {
        const { id, ...data } = sponsor;
        const doc = this.collection().doc(id);
        return from(doc.set(data)).pipe(
            map(() => {
                return sponsor;
            })
        );
    }
}
