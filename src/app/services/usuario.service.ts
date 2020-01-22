import { Injectable } from '@angular/core';
import { BehaviorSubject } from 'rxjs';

@Injectable()
export class UsuarioService {

  public usernameSource = new BehaviorSubject<string>('');
  public username$ = this.usernameSource.asObservable();

  constructor() { }
}
