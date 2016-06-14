import {Component, EventEmitter} from '@angular/core';

@Component({
    selector: 'login',
    inputs: ['firebase_auth', 'roles', 'custom_inputs', 'dictionary'],
    outputs: ['user'],
    template: `
        <div *ngIf="view === 'start'" class="fdc h100" style="justify-content:flex-end;padding-bottom:20%">
            <span style="flex-grow:1;font-size:30px" class="fdcc">{{ tr.title }}</span>
            <button full (click)="view = 'login'">{{ tr.login }}</button>
            <button full danger (click)="view = 'register'; role = _role" *ngFor="let _role of roles">Register as {{ _role }}</button>
        </div>

        <div *ngIf="view !== 'start'" class="h100">
            <button full light (click)="view = 'start'"><ion-icon name="arrow-back"></ion-icon> {{ tr.back }}</button>
            <div class="fcc w100" style="height:40px;color:red">
                {{ error }}
            </div>
            <ion-list class="m0">
                <ion-item>
                    <ion-label>{{ tr.email }}</ion-label>
                    <ion-input type="email" [(ngModel)]="email"></ion-input>
                </ion-item>
                <ion-item>
                    <ion-label>{{ tr.password }}</ion-label>
                    <ion-input type="password" [(ngModel)]="password"></ion-input>
                </ion-item>
                <div *ngIf="view === 'register'">
                    <ion-item *ngFor="let input of custom_inputs">
                        <ion-label>{{ input.label }}</ion-label>
                        <ion-input [type]="input.type" [(ngModel)]="input.value"></ion-input>
                    </ion-item>
                </div>
            </ion-list>
            <button light full small *ngIf="view === 'login'" (click)="resetPassword()">{{ tr.reset_password }}</button>
            <button full secondary (click)="next()" style="margin-top: 40px">{{ tr[view] }} {{ tr[role] }}</button>
        </div>
    `
})
export class Login {
    constructor() {
        this.view = 'start';
        this.user = new EventEmitter();
        this.tr = {
            'title': 'Title',
            'back': 'Back',
            'reset_password': 'Reset password',
            'login': 'Login',
            'register': 'Register',
            'email': 'Email',
            'password': 'Password',
            'auth/wrong-password': 'Incorrect password',
            'auth/user-not-found': 'User not found',
            'auth/invalid-email': 'Invalid email',
            'auth/weak-password': 'The password must be at least 6 characters long',
            'auth/email-already-in-use': 'Email already in use'
        }
    }
    ngOnInit() {
        this.dictionary = this.dictionary || {};
        console.log(this.dictionary);
        for(let k in this.dictionary) {
            console.log(k);
            this.tr[k] = this.dictionary[k];
        }
        this.firebase_auth.onAuthStateChanged(auth_data => {
            if(auth_data) {
                this.user.emit({email: auth_data.email, uid: auth_data.uid, role: this.role, custom_inputs: this.custom_inputs});
            } else {
                this.user.emit(null);
            }
        });
    }
    next() {
        let promise;
        if(this.view === 'login') {
            promise = this.firebase_auth.signInWithEmailAndPassword(this.email, this.password);
        } else {
            promise = this.firebase_auth.createUserWithEmailAndPassword(this.email, this.password);
        }
        promise.catch(error => {
            this.error = this.tr[error.code];
            setTimeout(() => this.error = null, 3000);
        });
    }
    resetPassword() {
        // TODO
    }
}