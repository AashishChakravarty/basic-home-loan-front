import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import {
  debounceTime,
  distinctUntilChanged,
  filter,
  switchMap,
} from 'rxjs/operators';

@Injectable({
  providedIn: 'root',
})
export class HomeService {
  constructor(private http: HttpClient) {}

  getRhyming(word: string): Observable<any> {
    return this.http.get('https://api.datamuse.com/words', {
      params: {
        max: '10',
        rel_rhy: word,
      },
    });
  }

  search(terms: Observable<any>) {
    return terms.pipe(
      filter((res) => res.length > 1),
      debounceTime(300),
      distinctUntilChanged(),
      switchMap((term) => this.searchEntries(term))
    );
  }

  searchEntries(word) {
    return this.http.get('https://api.datamuse.com/sug', {
      params: {
        s: word,
      },
    });
  }
}
