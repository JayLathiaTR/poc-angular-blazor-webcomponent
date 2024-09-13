import { Component, CUSTOM_ELEMENTS_SCHEMA, OnInit } from '@angular/core';
import { BlazorService } from '../../blazor.service';
import { BackendService } from '../../services/backend.service';
import { BLAZOR_COMPONENT_NAMES, WASM_METHOD_NAMES } from '../../events-config/webassembly-events';
import { CommentEventDetail } from '../../events-config/event-models';
import { Subscription } from 'rxjs';
import { EventHandlingService } from '../../services/event-handling.service';

@Component({
  schemas: [CUSTOM_ELEMENTS_SCHEMA],
  selector: 'app-chatbox',
  standalone: true,
  imports: [],
  templateUrl: './chatbox.component.html',
  styleUrl: './chatbox.component.scss'
})
export class ChatboxComponent implements OnInit {
  comments: Array<{ text: string, dateTime: string }> = [];
  private chatSubmittedSubscription: Subscription | undefined;

  constructor(
    private blazorSvc: BlazorService,
    private backendSvc: BackendService,
    private eventHandlingService: EventHandlingService
  ) { }

  ngOnInit(): void {
    this.chatSubmittedSubscription = this.eventHandlingService.chatSubmitted$.subscribe(
      (comment: CommentEventDetail) => this.handleChatSubmitted(comment)
    );
  }

  ngOnDestroy(): void {
    if (this.chatSubmittedSubscription) {
      this.chatSubmittedSubscription.unsubscribe();
    }
  }

  handleChatSubmitted(comment: CommentEventDetail): void {
    comment.userName = 'Michael, Cole'; // dynamically set the UserName
    console.log('Saving chat to server:', comment);

    this.backendSvc.addCommentToBackend(comment).subscribe({
      next: (response) => {
        console.log('Chat added to server:', response);
        this.fetchAndUpdateChats();
      },
      error: (error) => {
        console.error('Error adding chat to server:', error);
      },
      complete: () => {
        console.log('Any optional call to handle.');
      }
    });
  }

  fetchAndUpdateChats(): void {
    this.backendSvc.fetchCommentsFromBackend().subscribe({
      next: (comments) => {
        console.log('Fetched chats from server:', comments);
        this.blazorSvc.invokeBlazorMethodAsync(BLAZOR_COMPONENT_NAMES.CHAT_BOX_COMPONENT, WASM_METHOD_NAMES.FETCH_CHATS, comments).then(result => {
          console.log('Blazor component response:', result);
        }).catch(error => {
          console.error('Error from Blazor component with display chats:', error);
        });
      },
      error: (error) => {
        console.error('Error fetching chats from server:', error);
      }
    });
  }
}
