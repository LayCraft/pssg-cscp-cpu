import { Injectable } from '@angular/core';
import { BehaviorSubject } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class AuthenticationService {
  // this is an easy place to observe the state of a user. Just subscribe to it.
  // Ideally this won't be a string. Instead it should be a blob of user data to assess across the application
  // If the user is loaded they have gone through some form of authentication.
  // There should be a seperate place to put authorization so that we can seperate concerns.

  public user: BehaviorSubject<string> = new BehaviorSubject<string>(null);

  constructor() { }

  login() {
    this.user.next('Bob');
  }

  logout() {
    this.user.next(null);
  }

  private getCurrentUser(): string {
    // Query an API to find the current user
    return this.user.getValue()
  }
}
