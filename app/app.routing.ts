import { ModuleWithProviders }  from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

//import { ComponentName} from './path/name.component';

const appRoutes: Routes = [
    {
        path: '',
        redirectTo: '/_comp_url_path',
        pathMatch: 'full'
    }
];

export const myAppRouting: ModuleWithProviders = RouterModule.forRoot(appRoutes);

//Sample route to add
/*{
    path: '_comp_url_path',
        component: CompName
}*/
