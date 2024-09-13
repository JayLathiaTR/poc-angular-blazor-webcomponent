import { Injectable } from '@angular/core';
import { CommentEventDetail } from './events-config/event-models';
import { APP_EVENT_NAMES } from './events-config/webassembly-events';

@Injectable({
  providedIn: 'root'
})
export class BlazorService {
  private blazorComponents: { [key: string]: any } = {};

  constructor() { }

  registerBlazorComponent(componentName: string, dotNetObjectRef: any): void {
    if (!this.blazorComponents[componentName]) {
      this.blazorComponents[componentName] = dotNetObjectRef;
      console.log(`Blazor component: ${componentName} is registered`, dotNetObjectRef);
    } else {
      console.log(`Blazor component: ${componentName} is already registered`);
    }
  }

  async invokeBlazorMethodAsync(componentName: string, methodName: string, ...args: any[]): Promise<any> {
    const component = this.blazorComponents[componentName];
    if (!component) {
      throw new Error(`Blazor component: ${componentName} is not registered.`);
    }
    console.log(`Invoking Blazor Method: ${methodName} on ${componentName} with args`, args);
    return await component.invokeMethodAsync(methodName, ...args);
  }

  initializeGlobalMethods(): void {
    window.registerBlazorComponent = (componentName: string, dotNetObjectRef: any) => {
      this.registerBlazorComponent(componentName, dotNetObjectRef);
    };

    window.saveComment = (comment: CommentEventDetail) => {
      const event = new CustomEvent<CommentEventDetail>(APP_EVENT_NAMES.COMMENT_SUBMITTED, { detail: comment });
      window.dispatchEvent(event);
    };

    window.saveChat = (comment: CommentEventDetail) => {
      const event = new CustomEvent<CommentEventDetail>(APP_EVENT_NAMES.CHAT_SUBMITTED, { detail: comment });
      window.dispatchEvent(event);
    };
  }
}
