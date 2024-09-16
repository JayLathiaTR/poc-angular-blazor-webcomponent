import { bootstrapApplication } from '@angular/platform-browser';
import { appConfig } from './app/app.config';
import { AppComponent } from './app/app.component';
import { SafButton, SafIcon, SafProgressRing } from '@saffron/core-components';

bootstrapApplication(AppComponent, appConfig)
  .catch((err) => console.error(err));

SafButton();
SafIcon();
SafProgressRing();
