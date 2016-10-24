"use strict";
var router_1 = require('@angular/router');
//import { ComponentName} from './path/name.component';
var appRoutes = [
    {
        path: '',
        redirectTo: '/_comp_url_path',
        pathMatch: 'full'
    }
];
exports.myAppRouting = router_1.RouterModule.forRoot(appRoutes);
//Sample route to add
/*{
    path: '_comp_url_path',
        component: CompName
}*/
//# sourceMappingURL=app.routing.js.map