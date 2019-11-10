import { NgModule } from '@angular/core';
import { PreloadAllModules, RouterModule, Routes } from '@angular/router';
import {AuthGuardService} from './services/auth-guard.service';

const routes: Routes = [
  { path: '', redirectTo: 'login', pathMatch: 'full' },
  { path: 'register', loadChildren: './register/register.module#RegisterPageModule' },
  { path: 'login', loadChildren: './login/login.module#LoginPageModule' },
  { path: 'home', loadChildren: () => import('./home/home.module').then( m => m.HomePageModule), canActivate: [AuthGuardService]},
  { path: 'carros', loadChildren: './carros/carros.module#CarrosPageModule', canActivate: [AuthGuardService] },
  { path: 'usuarios', loadChildren: './usuarios/usuarios.module#UsuariosPageModule', canActivate: [AuthGuardService] }
];

@NgModule({
  imports: [
    RouterModule.forRoot(routes, { preloadingStrategy: PreloadAllModules })
  ],
  exports: [RouterModule]
})
export class AppRoutingModule { }
