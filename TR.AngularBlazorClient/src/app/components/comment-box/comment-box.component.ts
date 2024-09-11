import { Component, CUSTOM_ELEMENTS_SCHEMA, OnInit } from '@angular/core';
import { BlazorService } from '../../blazor.service';
import { APP_EVENT_NAMES, BLAZOR_COMPONENT_NAMES, WASM_METHOD_NAMES } from '../../events-config/webassembly-events';
import { CommentEventDetail } from '../../events-config/event-models';
import { BackendService } from '../../services/backend.service';

@Component({
  schemas: [CUSTOM_ELEMENTS_SCHEMA],
  selector: 'app-comment-box',
  standalone: true,
  imports: [],
  templateUrl: './comment-box.component.html',
  styleUrl: './comment-box.component.scss'
})
export class CommentBoxComponent implements OnInit {
  comments: Array<{ text: string, dateTime: string }> = [];

  constructor(private blazorSvc: BlazorService,
    private backendSvc: BackendService
  ) { }

  ngOnInit(): void {
    window.addEventListener(APP_EVENT_NAMES.COMMENT_SUBMITTED, this.handleCommentSubmitted.bind(this) as EventListener);
  }

  handleCommentSubmitted(event: Event) {
    const customEvent = event as CustomEvent<CommentEventDetail>;
    const comment = customEvent.detail;
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
      complete: () => { // <-- 'complete' method is optional and not required all the time
        console.log('Any optional call to handle.');
      }
    });
  }

  fetchAndUpdateComments() {
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
