import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root'
})
export class MainService {
  API = 'https://api.github.com/';
  constructor(private http: HttpClient) { }

  getGeneralData(params): any {
    return this.http.get(`${this.API}users`, {params});
  }

  getUsers(username: string, type: string, params: any): any {
    return this.http.get(`${this.API}search/users?q=${username}${type ? '+type:' + type : ''}`, {params});
  }

  getRepos(user: string, params: any): any {
    return this.http.get(`${this.API}users/${user}/repos`, { params });
  }

}
