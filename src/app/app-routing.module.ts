import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { InicioSesionComponent } from '../Components/inicio-sesion/inicio-sesion.component';

export const routes: Routes = [
  { path: 'inicio-sesion', component: InicioSesionComponent },
  { path: '', redirectTo: '/inicio-sesion', pathMatch: 'full' }
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
