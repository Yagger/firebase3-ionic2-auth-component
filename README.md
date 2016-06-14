# firebase3-ionic2-auth-component
Easy to use auth component for Firebase based Ionic2 applications.

### Screenshots
<img src="https://www.evernote.com/shard/s602/sh/72bc2464-471d-4cde-8ed1-572752c96855/768fc13c077ad8aa/res/2d1bad2e-144e-4b4d-8adc-b1ef1c71e96d/skitch.png?resizeSmall&width=832" width="200">
<img src="https://www.evernote.com/shard/s602/sh/ba6f68da-56fa-49c4-ba09-dd6f2bd7e844/c1d4f48a7d81aeaa/res/1911b881-aa01-4c2a-a87a-d5d69ba589fa/skitch.png?resizeSmall&width=832" width="200">
<img src="https://www.evernote.com/shard/s602/sh/da84f56f-0577-4c4e-8884-8ce3f28d29cc/f9de30e77614601d/res/07cb3229-d3d3-49ee-9e29-fd46f0dd8307/skitch.png?resizeSmall&width=832" width="200">

### Install
`npm install firebase3-ionic2-auth-component --save`

### Sample usage
```
import {Component} from '@angular/core';
import {firebase} from './services/firebase';
import {Login} from 'firebase3-ionic2-auth-component';

@Component({
    directives: [Login],
    template: `
        <ion-content>
            <login
                [firebase_auth]="firebase.auth"
                [roles]="['brand', 'blogger']"
                [custom_inputs]="[{label: 'Custom', type: 'text'}]"
                [dictionary]="dictionary"
                (user)="onUser($event)"></login>
        </ion-content>
    `
})
export class LoginPage {
    constructor() {
        this.firebase = firebase;
        this.dictionary = {
            'title': 'YourTitle',
            'brand': 'Brand',
            'blogger': 'Blogger'
        }
    }
    onUser(user) {
        console.log('USER: ', user);
    }
}
```

##### INPUT firebase_auth
An instance if Firebase (version 3) auth. A sample of `./services/firebase` implementation.
```
let _firebase = require('firebase');
let config = {
    apiKey: "FIXME",
    authDomain: "FIXME",
    databaseURL: "FIXME",
    storageBucket: "FIXME",
};
_firebase.initializeApp(config);
export let firebase = {
    ref: _firebase.database().ref(),
    auth: _firebase.auth(),
    storage: _firebase.storage().ref()
}
```

##### INPUT roles
If your app has multiple user roles, and a user can register as one role or another, provide the list of roles, ex. `[roles]="['brand', 'blogger']"`

##### INPUT custom_inputs
Anything extra you need a user to input before register, ex. `[custom_inputs]="[{label: 'Custom', type: 'text'}]"`

##### INPUT distionary
Values from this object will update the default dictionary of the component. Possible values:
```
{
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
```
NOTE: If you provide roles, then include the translations for each role, ex.
```
this.dictionary = {
    'title': 'YourTitle',
    'brand': 'Brand',
    'blogger': 'Blogger'
}
```
##### OUTPUT user
On user login or register, the output `user` will emit the user object of the following format:
```
{
  email: 'example@gmail.com',
  uid: 'USER-UID',
  role: 'brand',
  custom_inputs: [
    {
      label: 'Custom',
      type: 'text',
      value: 'my-custom-value'
    }
  ]
}
```
If user is not logger in or on logout event, the `user` output will emit `null`
