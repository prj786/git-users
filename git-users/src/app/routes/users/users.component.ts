import {Component, OnDestroy, OnInit} from '@angular/core';
import { Subscription } from 'rxjs';
import { MainService } from '../../services/main.service';
import {User} from '../../models';
import {debounceTime} from 'rxjs/operators';

@Component({
  selector: 'app-users',
  templateUrl: './users.component.html',
  styleUrls: ['./users.component.scss']
})
export class UsersComponent implements OnInit, OnDestroy {
  public queryParams: { since: number, per_page: number } = {
    since: 0,
    per_page: 10,
  };
  public searchParams: {name: string, type: string} = {
    name: '',
    type: null
  };
  public found = null;
  public searchValue = '';
  public reset = false;
  public gitUser: User[] = [];

  typeSelectors: any = [
    { name: 'user', value: 'User' },
    { name: 'organization', value: 'Organization' },
  ];

  countSelectors: any = [
    { name: '10', value: 10 },
    { name: 20, value: 20 },
    { name: 40, value: 40 },
    { name: 60, value: 60 },
    { name: 100, value: 100 },
  ];

  private dataSubscription: Subscription;
  private generalDataSubscription: Subscription;

  constructor(private mainService: MainService) { }

  ngOnInit(): void {
    this.getGeneralData();
  }

  ngOnDestroy(): void {
    if (this.dataSubscription) { this.dataSubscription.unsubscribe(); }
    if (this.generalDataSubscription) { this.generalDataSubscription.unsubscribe(); }
  }


  public getValue(sorter: boolean, value: any): void {
    if (sorter) {
      this.reset = true;
      this.queryParams.since = 0;
      this.queryParams.per_page = value;
      this.getGeneralData();
    } else {
      this.searchParams.type = value;
      if (!value && !this.searchParams.name) {
        this.getGeneralData();
        return;
      }
      this.getData();
    }
  }

  public getData(): void {
    this.dataSubscription = this.mainService.getUsers(this.searchParams.name, this.searchParams.type, this.queryParams)
      .pipe(
        debounceTime(1000)
      )
      .subscribe(users => {
        this.found = users.total_count;
        this.gitUser = this.normalizeUsers(users.items);
    });
  }

  public getGeneralData(): void {
    this.generalDataSubscription = this.mainService.getGeneralData(this.queryParams).subscribe(users => {
      this.found = null;
      this.gitUser = this.normalizeUsers(users);
    });
  }

  public pageTo(page: number): void {
    const lastUser = page * this.queryParams.per_page;
    this.reset = false;
    this.queryParams.since = lastUser;
    if (this.searchParams.name || this.searchParams.type) {
      this.getData();
      return;
    }
    this.getGeneralData();
  }

  searchData(): void {
    if (this.searchValue) {
      this.searchParams.name = this.searchValue;
      this.getData();
      return;
    }
    this.getGeneralData();
  }

  normalizeUsers(users): User[] {
    return users.map(user => {
      return {
        avatar: user.avatar_url,
        name: user.login,
        type: user.type
      };
    });
  }
}

