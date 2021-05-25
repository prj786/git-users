import {Component, OnDestroy, OnInit} from '@angular/core';
import {MainService} from '../../services/main.service';
import {Repo} from '../../models';
import {ActivatedRoute} from '@angular/router';
import {Subscription} from 'rxjs';

@Component({
  selector: 'app-repos',
  templateUrl: './repos.component.html',
  styleUrls: ['./repos.component.scss']
})
export class ReposComponent implements OnInit, OnDestroy {

  public repos: Repo[] = [];
  public user: string;
  public asc = false;
  public queryParams: any = {
    direction: 'desc',
    sort: 'full_name',
    per_page: 10,
    page: 1,
  };
  public sortList: any = [
    {name: 'Full Name', value: 'full_name'},
    {name: 'Created', value: 'created'},
    {name: 'Updated', value: 'updated'},
    {name: 'Pushed', value: 'pushed'},
  ];

  private dataSubscription: Subscription;

  constructor(private mainService: MainService, private activatedRoute: ActivatedRoute) { }

  ngOnInit(): void {
    this.activatedRoute.params.subscribe(param => {
      this.user = param.user;
    });
    this.getRepos();
  }

  ngOnDestroy(): void {
    if (this.dataSubscription) { this.dataSubscription.unsubscribe(); }
  }

  public getRepos(): void {
    this.dataSubscription = this.mainService.getRepos(this.user, this.queryParams).subscribe(repos => {
      this.repos = repos.map((item: any) => {
        return {
          fullName: item.full_name,
          stargazers: item.stargazers_count,
          watchers: item.watchers_count,
          forks: item.forks_count,
          language: item.language,
          issues: item.open_issues_count,
          license: item.license,
          lastUpdated: `${new Date(item.created_at).getDate()}/${new Date(item.created_at).getMonth() + 1}/${new Date(item.created_at).getFullYear()}`
        };
      });
    });
  }

  public getValue(order: boolean, event: any): void {
    console.log(event);
    if (order) {
      this.queryParams.sort = event;
    } else {
      this.queryParams.direction = this.asc ? 'asc' : 'desc';
    }
    this.getRepos();
  }

}
