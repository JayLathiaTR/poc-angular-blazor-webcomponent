import { bootstrapApplication } from '@angular/platform-browser';
import { appConfig } from './app/app.config';
import { AppComponent } from './app/app.component';

bootstrapApplication(AppComponent, appConfig)
  .catch((err) => console.error(err));

// bootstrapApplication(AppComponent, appConfig)
//   .then(ref => {
//     (window as any).angularInjector = ref.injector;
//   })
//   .catch((err) => console.error(err));
