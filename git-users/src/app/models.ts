export interface User {
  avatar: string;
  name: string;
  type: string;
}

export interface ListModel {
  name: string;
  value: string;
}

export interface Repo {
  watchers: number;
  stargazers: number;
  issues: number;
  forks: number;
  fullName: string;
  language: string;
  license: any;
  lastUpdated: string;
}
