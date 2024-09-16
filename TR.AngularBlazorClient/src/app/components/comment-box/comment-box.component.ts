import { Component, CUSTOM_ELEMENTS_SCHEMA, OnDestroy, OnInit } from '@angular/core';
import { BlazorService } from '../../blazor.service';
import { BLAZOR_COMPONENT_NAMES, WASM_METHOD_NAMES } from '../../events-config/webassembly-events';
import { CommentEventDetail } from '../../events-config/event-models';
import { BackendService } from '../../services/backend.service';
import { Subscription } from 'rxjs';
import { EventHandlingService } from '../../services/event-handling.service';

@Component({
  schemas: [CUSTOM_ELEMENTS_SCHEMA],
  selector: 'app-comment-box',
  standalone: true,
  imports: [],
  templateUrl: './comment-box.component.html',
  styleUrl: './comment-box.component.scss'
})
export class CommentBoxComponent implements OnInit, OnDestroy {
  comments: Array<{ text: string, dateTime: string }> = [];
  private commentSubmittedSubscription: Subscription | undefined;

  constructor(
    private blazorSvc: BlazorService,
    private backendSvc: BackendService,
    private eventHandlingService: EventHandlingService
  ) { }

  ngOnInit(): void {
    this.commentSubmittedSubscription = this.eventHandlingService.commentSubmitted$.subscribe(
      (comment: CommentEventDetail) => this.handleCommentSubmitted(comment)
    );
  }

  ngOnDestroy(): void {
    if (this.commentSubmittedSubscription) {
      this.commentSubmittedSubscription.unsubscribe();
    }
  }

  handleCommentSubmitted(comment: CommentEventDetail): void {
    comment.userName = 'Michael, Cole'; // dynamically set the UserName
    console.log('Saving comment to server:', comment);

    this.backendSvc.addCommentToBackend(comment).subscribe({
      next: (response) => {
        console.log('Comment added to server:', response);
        this.fetchAndUpdateComments();
      },
      error: (error) => {
        console.error('Error adding comment to server:', error);
      },
      complete: () => {
        console.log('Any optional call to handle.');
      }
    });
  }

  fetchAndUpdateComments(): void {
    this.backendSvc.fetchCommentsFromBackend().subscribe({
      next: (comments) => {
        console.log('Fetched comments from server:', comments);
        this.blazorSvc.invokeBlazorMethodAsync(BLAZOR_COMPONENT_NAMES.COMMENT_BOX_COMPONENT, WASM_METHOD_NAMES.FETCH_COMMENTS, comments).then(result => {
          console.log('Blazor component response:', result);
        }).catch(error => {
          console.error('Error from Blazor component with display comments:', error);
        });
      },
      error: (error) => {
        console.error('Error fetching comments from server:', error);
      }
    });
  }
}
