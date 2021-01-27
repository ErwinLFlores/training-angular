export class LoginAuth {
  static readonly type = '[auth] login auth';
  constructor(public auth: any) {}
}
export class SetToken{
  static readonly type = '[auth] set token';
  constructor(public token: string) {}
}

export class Logout{
  static readonly type = '[Logout] Logout';
  constructor() {}
}

export class GetUserList{
  static readonly type = '[List] user list';
  constructor() {}
}

export class CreateUser{
  static readonly type = '[add] create user';
  constructor(public data: any) {}
}

export class DeleteUser{
  static readonly type = '[delete] delete user';
  constructor(public data: any) {}
}
