import { State, Selector, Action, StateContext } from '@ngxs/store';
import { Injectable } from '@angular/core';
import { AuthService } from '../services/auth.service';
import { LoginAuth, SetToken, Logout , CreateUser, GetUserList , DeleteUser } from './auth.actions';



export class AuthStateModel {
  auth: any;
  token: any;
  users:any;
  logged?: boolean;
}

@State<AuthStateModel>({
  name: 'auth',
  defaults: {
    auth: null,
    token: null,
    logged: false,
    users: {},
  }
})

@Injectable()
export class AuthState {
  constructor(private _authService: AuthService) {}

  @Selector()
  static auth(state: AuthStateModel): any{
    return state.auth;
  }

  @Selector()
  static token(state: AuthStateModel): any{
    return atob(state.token);
  }

  @Selector()
  static logged(state: AuthStateModel): any{
    return state.logged;
  }

  @Selector()
  static users(state: AuthStateModel): any{
    return state.users;
  }

  @Selector()
  static getCheckLogin(state: AuthStateModel): any{
    const token = localStorage.getItem('token');

    if(token){
      return true;
    }else{
      return false;
    }
  }

  @Action(LoginAuth, { cancelUncompleted: true})
  LoginAuth({patchState, dispatch} : StateContext<AuthStateModel>, { auth }: LoginAuth): void{
    this._authService.login(auth).subscribe(
      (response: any) => {
        if(response.status === 'success'){
          patchState({ logged: true});
          dispatch(new SetToken(response.data.original.token));
        }
      },
      (response: any) => {
        if(response.error){
          const error = response.error;
          error.code = response.error;

          console.log(error.message);
        }
      }
    );
  }

  @Action (Logout, {cancelUncompleted: true})
  logout({patchState}: StateContext<AuthStateModel>): void {
    localStorage.removeItem('token');
  }

  @Action(SetToken)
  SetToken({ patchState }: StateContext<AuthStateModel>, { token }: SetToken) : void {
    // token = btoa(token);
    localStorage.setItem('token' , token);
  }

  /* CRUD */
  @Action(GetUserList, { cancelUncompleted: true})
  GetUserList({patchState} : StateContext<AuthStateModel>, {  }: GetUserList): void{
    this._authService.userlist({}).subscribe(
      (response: any) => {
        if(response.status === 'success'){
          patchState({
            users: response.data
          });
        }
      },
      (response: any) => {
        if(response.error){
          const error = response.error;
          error.code = response.error;

          console.log(error.message);
        }
      }
    );
  }

  @Action(CreateUser, { cancelUncompleted: true})
  CreateUser({patchState, dispatch} : StateContext<AuthStateModel>, { data }: CreateUser): void{
    this._authService.save(data).subscribe(
      (response: any) => {
        if(response.status === 'success'){

        }
      },
      (response: any) => {
        if(response.error){
          const error = response.error;
          error.code = response.error;

          console.log(error.message);
        }
      }
    );
  }


  @Action(DeleteUser, { cancelUncompleted: true})
  DeleteUser({patchState, dispatch} : StateContext<AuthStateModel>, { data }: DeleteUser): void{
    this._authService.delete(data).subscribe(
      (response: any) => {
        if(response.status === 'success'){

        }
      },
      (response: any) => {
        if(response.error){
          const error = response.error;
          error.code = response.error;

          console.log(error.message);
        }
      }
    );
  }

}
