import { Component, OnInit } from '@angular/core';
import firebase from 'firebase/app';
import { ToastrService } from 'ngx-toastr';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})
export class AppComponent implements OnInit {
  title = 'fotogram';

  constructor(
    private toastr: ToastrService
  ) {}

  ngOnInit(): void {
    const firebaseConfig = {
      apiKey: 'AIzaSyAwne3_w7BT2WTrAp97eym1iBlj5iZxk4I',
      authDomain: 'fotogram-c9f23.firebaseapp.com',
      databaseURL: 'https://fotogram-c9f23.firebaseio.com',
      projectId: 'fotogram-c9f23',
      storageBucket: 'fotogram-c9f23.appspot.com',
      messagingSenderId: '666534137618',
      appId: '1:666534137618:web:59af9a53bcafb47302edcb',
      measurementId: 'G-9HWLWJJ0L7'
    };
    firebase.initializeApp(firebaseConfig);
  }


}
