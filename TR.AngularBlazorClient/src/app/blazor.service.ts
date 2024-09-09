import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { CommentEventDetail } from './events-config/event-models';
import { APP_EVENT_NAMES } from './events-config/angular-events';

@Injectable({
  providedIn: 'root'
})
export class BlazorService {
  private blazorComponent: any;

  constructor(private http: HttpClient) { }

  registerBlazorComponent(dotNetObjectRef: any): void {
    this.blazorComponent = dotNetObjectRef;
  }

  async invokeBlazorMethodAsync(methodName: string, ...args: any[]): Promise<any> {
    if (!this.blazorComponent) {
      throw new Error('Blazor component is not registered.');
    }
    console.log('Invoking Blazor Method:', methodName, args);
    return await this.blazorComponent.invokeMethodAsync(methodName, ...args);
  }

  initializeGlobalMethods(): void {
    window.registerBlazorComponent = (dotNetObjectRef: any) => {
      this.registerBlazorComponent(dotNetObjectRef);
    };

    window.saveComment = (comment: CommentEventDetail) => {
      const event = new CustomEvent<CommentEventDetail>(APP_EVENT_NAMES.COMMENT_SUBMITTED, { detail: comment });
      console.log('CustomEvent for Comment: ', event);
      window.dispatchEvent(event);
    };
  }

  addCommentToBackend(comment: CommentEventDetail): Observable<CommentEventDetail> {
    const url = 'https://blazor-angular.free.beeceptor.com/saveComment';
    return this.http.post<CommentEventDetail>(url, comment);
  }

  fetchCommentsFromBackend(): Observable<CommentEventDetail[]> {
    const url = 'https://blazor-angular.free.beeceptor.com/getComments';
    return this.http.get<CommentEventDetail[]>(url);
  }
}
