import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { CommentEventDetail } from '../events-config/event-models';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class BackendService {

  constructor(private http: HttpClient) { }

  fetchCommentsFromBackend(): Observable<CommentEventDetail[]> {
    const url = 'https://subsample.free.beeceptor.com/getComments';
    return this.http.get<CommentEventDetail[]>(url);
  }

  addCommentToBackend(comment: CommentEventDetail): Observable<CommentEventDetail> {
    const url = 'https://subsample.free.beeceptor.com/saveComment';
    return this.http.post<CommentEventDetail>(url, comment);
  }
}
