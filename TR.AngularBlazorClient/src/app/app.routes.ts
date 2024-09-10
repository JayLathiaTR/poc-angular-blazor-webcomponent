import { Routes } from '@angular/router';
import { WeatherComponent } from './components/weather/weather.component';
import { CommentBoxComponent } from './components/comment-box/comment-box.component';

export const routes: Routes = [
    { path: 'weather', component: WeatherComponent },
    { path: 'comment', component: CommentBoxComponent }
];
