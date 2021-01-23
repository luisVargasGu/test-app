import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { HomeComponent } from './components/home/home.component';
import { QuestionaireComponent } from './components/questionaire/questionaire.component';


const routes: Routes = [
  { path: "", pathMatch: "full", redirectTo: "form" },
  {
    path: "home",
    component: HomeComponent,
  },
  {
    path: "form",
    component: QuestionaireComponent
  },
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
