import { Component, OnInit } from '@angular/core';
import { Subject } from 'rxjs';
import { HomeService } from '../services/home/home.service';

@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.scss'],
})
export class HomeComponent implements OnInit {
  heading = 'Top 10 Words';
  isSearch: boolean = false;
  search = '';
  wordsList: any = [];

  searchWord = new Subject<string>();
  searchResult$: any = [];

  constructor(private homeService: HomeService) {
    this.searchResult$ = this.homeService.search(this.searchWord);
  }

  ngOnInit(): void {}

  onSearch(event) {
    this.isSearch = true;
    this.searchWord.next(event.target.value);
    if (event.target.value.length < 2) {
      this.isSearch = false;
    }
  }

  selectResult(searchWord) {
    this.search = searchWord.word;
    this.isSearch = false;
    this.searchRhyming();
  }

  searchRhyming() {
    this.homeService.getRhyming(this.search).subscribe(
      (response) => {
        this.heading = `Top Rhyming Words of ${this.search}`;
        this.wordsList = response;
      },
      (err) => {
        console.log(err);
      }
    );
  }
}
