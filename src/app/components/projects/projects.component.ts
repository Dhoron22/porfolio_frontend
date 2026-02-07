import { Component, OnInit } from '@angular/core';
import { ProjectService } from '../../services/project.service';
import {Project } from '../../models/project';

@Component({
  selector: 'app-projects',
  standalone: false,
  templateUrl: './projects.component.html',
  styleUrl: './projects.component.scss'
})
export class ProjectsComponent implements OnInit {
  projects: Project[] = [];
  loading: boolean = false;
  error:string = '';

  constructor(private projectService: ProjectService) {}

  ngOnInit(): void {
    this.loadProjects();
  }

  loadProjects(): void {
    this.loading = true;
    this.error = '';

    this.projectService.getAll().subscribe({
      next: (data) => {
        this.projects = data;
        this.loading = false;
        console.log('✅ Proyectos cargados:', data);
      },
      error: (error) => {
        this.error = 'Error al cargar proyectos';
        this.loading = false;
        console.error('❌ Error:', error);
      }
    });
  }

  deleteProject(id: number): void {
    if (confirm('¿Estás seguro de eliminar este proyecto?')) {
      this.projectService.delete(id).subscribe({
        next: (response) => {
          console.log('✅', response.message);
          this.loadProjects(); // Recargar lista
        },
        error: (error) => {
          console.error('❌ Error al eliminar:', error);
          alert('Error al elminar el proyecto')
        }
      });
    }
  }
}
