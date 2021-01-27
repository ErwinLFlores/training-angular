import { Component, OnInit } from '@angular/core';
import { LoginAuth, Logout, CreateUser, GetUserList, DeleteUser } from './states/auth.actions';
import { AuthState } from './states/auth.state';
import { Store } from '@ngxs/store';


@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})
export class AppComponent implements OnInit {

  title = 'ticketing';

  isLogged:boolean;
  userList:any;

  logins = {
    email: '',
    password: ''
  };

  users = {
    id: '',
    first_name: '',
    last_name:'',
    email:''
  }


  constructor( private _store : Store) {
    this.isLogged = false;
  }

  ngOnInit(): void {
    const isLog = this._store.selectSnapshot(AuthState.getCheckLogin);
    this.isLogged = isLog;

    this._store.dispatch( new GetUserList());

    setTimeout(() => {
      const user = this._store.selectSnapshot(AuthState.users);
      this.userList = user;
    }, 100);

  }


  onLogin(){
    if(this.logins){
      const login = Object.assign({}, this.logins);
      this._store.dispatch( new LoginAuth(login));

      const user = this._store.selectSnapshot(AuthState.users);
      this.userList = user;

      setTimeout(() => {
        const isLog = this._store.selectSnapshot(AuthState.logged);
        this.isLogged = isLog;
      }, 100);
    }
  }

  onSave(){
    if(this.users){
      const user = Object.assign({}, this.users);
      this._store.dispatch( new CreateUser(user));
    }
  }

  onDelete(){
    console.log(this.users);
    // if(this.users){
    //   const user = Object.assign({}, this.users);
    //   this._store.dispatch( new DeleteUser(user));
    // }
  }

  onLogout(){
    this._store.dispatch(new Logout())
    this.isLogged = false;
  }
}

