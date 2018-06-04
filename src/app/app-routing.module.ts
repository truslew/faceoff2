import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { HomePageComponent } from './home-page/home-page.component';
import { InformationPageComponent } from './information-page/information-page.component';

const routes: Routes = [
    { path: 'hjem', component: HomePageComponent },
    { path: 'informasjon', component: InformationPageComponent },

    { path: '', redirectTo: 'hjem', pathMatch: 'full' },
    { path: '**', redirectTo: 'hjem', pathMatch: 'full' }
];

@NgModule({
    imports: [RouterModule.forRoot(routes)],
    exports: [RouterModule]
})
export class AppRoutingModule {}
