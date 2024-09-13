// Typecasting Global Web-Component: Events, Methods, etc
import { CommentEventDetail } from './app/events-config/event-models';

declare global {
    interface Window {
        registerBlazorComponent: (componentName: string, dotNetObjectRef: any) => void;
        saveComment: (comment: CommentEventDetail) => void;
        saveChat: (comment: CommentEventDetail) => void;
    }
}
