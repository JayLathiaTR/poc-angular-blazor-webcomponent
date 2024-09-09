import { CommonModule } from '@angular/common';
import { Component, CUSTOM_ELEMENTS_SCHEMA, OnInit } from '@angular/core';
import { RouterOutlet } from '@angular/router';
import { BlazorService } from './blazor.service';
import { APP_EVENT_NAMES, WASM_METHOD_NAMES } from './events-config/angular-events';
import { CommentEventDetail } from './events-config/event-models';

@Component({
  schemas: [CUSTOM_ELEMENTS_SCHEMA],
  selector: 'app-root',
  standalone: true,
  imports: [RouterOutlet, CommonModule],
  templateUrl: './app.component.html',
  styleUrl: './app.component.scss'
})

export class AppComponent implements OnInit {
  title = 'Angular Blazor Client';
  comments: Array<{ text: string, dateTime: string }> = [];

  constructor(private blazorService: BlazorService) { }

  ngOnInit(): void {
    this.blazorService.initializeGlobalMethods();
    window.addEventListener(APP_EVENT_NAMES.COMMENT_SUBMITTED, this.handleCommentSubmitted.bind(this) as EventListener);
  }

  handleCommentSubmitted(event: Event) {
    const customEvent = event as CustomEvent<CommentEventDetail>;
    const comment = customEvent.detail;
    comment.userName = 'Michael, Cole'; // dynamically set the UserName
    console.log('Saving comment to server:', comment);

    this.blazorService.addCommentToBackend(comment).subscribe({
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
    this.blazorService.fetchCommentsFromBackend().subscribe({
      next: (comments) => {
        console.log('Fetched comments from server:', comments);
        this.blazorService.invokeBlazorMethodAsync(WASM_METHOD_NAMES.FETCH_COMMENTS, comments).then(result => {
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
