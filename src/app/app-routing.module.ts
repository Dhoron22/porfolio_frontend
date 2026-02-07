import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';

// Importar componentes
import { HomeComponent } from './components/home/home.component';
import { ProjectsComponent } from './components/projects/projects.component';
import { AboutComponent } from './components/about/about.component';
import { SkillsComponent } from './components/skills/skills.component';
import { EducationComponent } from './components/education/education.component';
import { LanguagesComponent } from './components/languages/languages.component';
import { WorkExperienceComponent } from './components/work-experience/work-experience.component';


const routes: Routes = [
  { path: '', component: HomeComponent }, // Ruta principal
  { path: 'home', component: HomeComponent },
  { path: 'projects', component: ProjectsComponent },
  { path: 'about', component: AboutComponent },
  { path: 'skills', component: SkillsComponent },
  { path: 'education', component: EducationComponent},
  { path: 'languages', component: LanguagesComponent},
  { path: 'work-experience', component: WorkExperienceComponent},
  { path: '**', redirectTo: '' } // Ruta wildcard - redirige a home si la ruta no existe
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
