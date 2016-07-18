import { provideRouter, RouterConfig }  from '@angular/router';
import {HomeComponent } from './home';
import{ AboutComponent} from './about';
//import{ ProductComponent } from './product';

const routes: RouterConfig = [
    {
        path: '',
        component: HomeComponent
    },
    {
        path: 'about',
        component: AboutComponent
    }
];

export const APP_ROUTER_PROVIDERS=[
    provideRouter(routes)

];

/*
    {
        path: 'product/:id',
        component: ProductComponent
    }
*/