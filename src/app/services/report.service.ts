import { Injectable } from '@angular/core';
import {HttpClient} from '@angular/common/http';
import {Router} from '@angular/router';
import {environment} from '../../environment';
import {Observable} from 'rxjs';

@Injectable({
  providedIn: 'root'
})

export class Report {
  id: number;
  user: string;
  reason: string;
  repotedBy: string;
}
export class ReportService {
  [x: string]: any;
  private SERVER_URL = environment.SERVER_URL;

  constructor(
    private httpClient: HttpClient) { }

    getAllReports(): Observable<Report[]> {
      console.log('getting all the favorites from the server');
      return this.httpClient.get<Report[]>(this.SERVER_URL + '/report');
    }

    // tslint:disable-next-line:variable-name
    getReport(_id: number): Observable<Report> {
      return this.httpClient.get<Report>(`${this.SERVER_URL}/report/${_id}`);
  }


  addReport(newReport: Report): Observable<Report> {
    return this.httpClient.post<Report>(`${this.SERVER_URL}/report`, newReport, {
        headers: {
            'Content-Type': 'application/json'
        }
    });
}
// tslint:disable-next-line:variable-name
deleteReport(_id: number): Observable < Report > {
  console.log(' i am deleteing the favorite number of the fowlliwing', _id);
  return this.httpClient.delete<Report>(`${this.SERVER_URL}/report/ ${_id}`);
}

}


