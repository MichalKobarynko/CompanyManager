import { NgModule } from "@angular/core";
import { RouterModule, Routes } from "@angular/router";
import { BorderComponent } from "./border/border.component";
import { AuthGuard } from "./guards/auth.guard";
import { AuthComponent } from "./auth/auth.component";
import { PageNotFoundComponent } from "./page-not-found/page-not-found.component";
import { AuthModule } from "./auth/auth.module";
import { PageForbiddenComponent } from "./page-forbidden/page-forbidden.component";

const routes: Routes = [
  { path: 'auth', redirectTo: "auth/login" },
  {
    path: 'app',
    component: BorderComponent,
    canActivate: [AuthGuard]
  },
  { path: 'forbiddenforbidden', component: PageForbiddenComponent },
  { path: '', redirectTo: 'app', pathMatch: 'full' },
  { path: '**', component: PageNotFoundComponent },

]

@NgModule({
  imports: [
    RouterModule.forRoot(routes),
    AuthModule],
  exports: [RouterModule],
  providers: [AuthGuard]
})
export class AppRoutingModule {

}
