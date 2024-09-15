import { bootstrapApplication } from '@angular/platform-browser';
import { appConfig } from './app/app.config';
import { AppComponent } from './app/app.component';
import { registerLicense } from '@syncfusion/ej2-base';



registerLicense('Ngo9BigBOggjHTQxAR8/V1NCaF1cWWhIfkx3QXxbf1x0ZFJMZVhbRnFPMyBoS35RckVqWHtfdHdTRmdfUEZz');
bootstrapApplication(AppComponent, appConfig)
  .catch((err) => console.error(err));
