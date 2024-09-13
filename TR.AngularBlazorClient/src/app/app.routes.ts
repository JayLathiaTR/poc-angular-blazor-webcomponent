import { Routes } from '@angular/router';
import { WeatherComponent } from './components/weather/weather.component';
import { CommentBoxComponent } from './components/comment-box/comment-box.component';
import { CounterComponent } from './components/counter/counter.component';
import { ChatboxComponent } from './components/chatbox/chatbox.component';

export const routes: Routes = [
    { path: 'comment', component: CommentBoxComponent },
    { path: 'chat', component: ChatboxComponent },
    { path: 'weather', component: WeatherComponent },
    { path: 'counter', component: CounterComponent },
];
