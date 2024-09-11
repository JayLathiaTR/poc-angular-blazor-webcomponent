import { Routes } from '@angular/router';
import { WeatherComponent } from './components/weather/weather.component';
import { CommentBoxComponent } from './components/comment-box/comment-box.component';
import { CounterComponent } from './components/counter/counter.component';

export const routes: Routes = [
    { path: 'weather', component: WeatherComponent },
    { path: 'comment', component: CommentBoxComponent },
    { path: 'counter', component: CounterComponent }
];
