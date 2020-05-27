import { Component, OnInit, OnDestroy } from '@angular/core';
import { AppDataService } from '../../services/app-data.service';
import { HouseModel } from '../../types/app-data.types';
import { Subject } from 'rxjs';
import { takeUntil } from 'rxjs/operators';
import { HttpErrorResponse } from '@angular/common/http';
import { ActivatedRoute } from '@angular/router';

@Component({
  selector: 'app-details',
  templateUrl: './details.component.html',
  styleUrls: ['./details.component.scss']
})
export class DetailsComponent implements OnInit, OnDestroy {

  public house: HouseModel;
  public hasError = false;

  private ngUnsubscribe: Subject<boolean> = new Subject();

  public get loading(): boolean {
    return !this.hasError && !this.house;
  }

  constructor(private appData: AppDataService,
              private route: ActivatedRoute) { }

  ngOnInit(): void {

    const id = this.route.snapshot.paramMap.get('id');

    if (!id) {return; }

    this.appData.getHouse(id)
      .pipe(takeUntil(this.ngUnsubscribe))
      .subscribe(
        (house: HouseModel) => this.house = house,
        (error: HttpErrorResponse) => {
          this.hasError = true;
          throw new Error(`Error ${error.message} with code ${error.status} occurred`);
        },
        );
  }

  ngOnDestroy() {
    this.ngUnsubscribe.next();
    this.ngUnsubscribe.complete();
  }

}
