import { Injectable } from '@angular/core';
import { BehaviorSubject } from 'rxjs';
import { iPerson } from '../models/person.class';
import { iContactInformation } from '../models/contact-information.class';
import { Transmogrifier } from '../models/transmogrifier.class';

@Injectable({
  providedIn: 'root'
})
export class StateService {
  // these are observable states for the application load these in at login time.
  main: BehaviorSubject<Transmogrifier> = new BehaviorSubject(null);
  constructor() { }
}
