import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import {
  debounceTime,
  distinctUntilChanged,
  filter,
  switchMap,
} from 'rxjs/operators';
import { environment } from 'src/environments/environment';

@Injectable({
  providedIn: 'root',
})
export class HomeService {
  BASE_URL = environment.BASE_URL;
  DATAMUSE_API_URL = environment.DATAMUSE_API_URL;

  constructor(private http: HttpClient) {}

  addWord(data: any): Observable<any> {
    return this.http.post(`${this.BASE_URL}words`, data);
  }

  topWords(): Observable<any> {
    return this.http.get(`${this.BASE_URL}words`);
  }

  getRhyming(word: string): Observable<any> {
    return this.http.get(`${this.DATAMUSE_API_URL}words`, {
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
    return this.http.get(`${this.DATAMUSE_API_URL}sug`, {
      params: {
        s: word,
      },
    });
  }
}
