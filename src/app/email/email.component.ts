import { Component, OnInit } from '@angular/core';
import { AngularFireAuth } from 'angularfire2/auth';
import { Router } from '@angular/router';
import { FormGroup, Validators, FormBuilder } from '@angular/forms';
// import * as firebase from 'firebase/app';

@Component({
    selector: 'app-email',
    templateUrl: './email.component.html',
    styleUrls: ['./email.component.scss']
})
export class EmailComponent {
    form: FormGroup;

    error: any;

    constructor(public af: AngularFireAuth, private router: Router, fb: FormBuilder) {
        this.af.authState.subscribe(auth => {
            if (auth) {
                this.router.navigateByUrl('/kamper');
            }
        });

        this.form = fb.group({
            email: ['', Validators.required],
            password: ['', Validators.required]
        });
    }

    onSubmit() {
        if (this.form.valid) {
            this.af.auth
                .signInWithEmailAndPassword(this.form.value.email, this.form.value.password)
                .then(success => {
                    console.log(success);
                    this.router.navigate(['/kamper']);
                })
                .catch(err => {
                    console.log(err);
                    this.error = err;
                });
        }
    }
}
