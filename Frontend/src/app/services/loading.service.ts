import { Injectable } from '@angular/core';
import { BehaviorSubject } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class LoadingService {
  private isLoadedSubject = new BehaviorSubject<boolean>(false);
  isLoaded$ = this.isLoadedSubject.asObservable();

  setLoaded(status: boolean) {
    this.isLoadedSubject.next(status);
  }

  get isLoaded(): boolean {
    return this.isLoadedSubject.value;
  }
}
