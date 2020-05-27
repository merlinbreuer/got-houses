import { Component, OnInit, OnDestroy } from '@angular/core';
import { takeUntil } from 'rxjs/operators';
import { Subject } from 'rxjs';
import { HttpErrorResponse } from '@angular/common/http';
import { HouseModel } from '../../types/app-data.types';
import { AppDataService } from '../../services/app-data.service';

@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.scss']
})
export class HomeComponent implements OnInit, OnDestroy {

  public houses: HouseModel[] = [];
  public hasError = false;
  public loading = false;

  private ngUnsubscribe: Subject<boolean> = new Subject();
  private scrollIndex = 1;

  constructor(private appData: AppDataService) {
  }

  public onScroll() {
    this.scrollIndex += 1;
    this.loadHouses(this.scrollIndex);
  }

  private loadHouses(page: number) {
    this.loading = true;
    this.appData.getHouses(page)
    .pipe(takeUntil(this.ngUnsubscribe))
    .subscribe(
      (houses: HouseModel[]) => {
        this.houses = this.houses.concat(houses);
        this.loading = false;
      },
      (error: HttpErrorResponse) => {
        this.hasError = true;
        this.loading = false;
        throw new Error(`Error ${error.message} with code ${error.status} occurred`);
      },
      );
  }

  ngOnInit(): void {
    this.loadHouses(this.scrollIndex);
  }

  ngOnDestroy() {
    this.ngUnsubscribe.next();
    this.ngUnsubscribe.complete();
  }
}
