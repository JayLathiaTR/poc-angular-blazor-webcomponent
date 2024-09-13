import { Injectable } from '@angular/core';
import { Subject } from 'rxjs';
import { CommentEventDetail } from '../events-config/event-models';

@Injectable({
  providedIn: 'root'
})
export class EventHandlingService {
  private commentSubmittedSubject = new Subject<CommentEventDetail>();
  private chatSubmittedSubject = new Subject<CommentEventDetail>();

  commentSubmitted$ = this.commentSubmittedSubject.asObservable();
  chatSubmitted$ = this.chatSubmittedSubject.asObservable();

  initializeGlobalMethods(): void {
    window.saveComment = (comment: CommentEventDetail) => {
      this.commentSubmittedSubject.next(comment);
    };

    window.saveChat = (comment: CommentEventDetail) => {
      this.chatSubmittedSubject.next(comment);
    };
  }
}