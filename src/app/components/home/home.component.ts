import { Component, OnInit } from '@angular/core';
import { PersonalInfoService } from '../../services/personal-info.service';
import { ProjectService } from '../../services/project.service';
import { SkillService } from '../../services/skill.service';
import { PersonalInfo } from '../../models/personal-info';
import { Project } from '../../models/project';
import { Skill } from '../../models/skill';

@Component({
  selector: 'app-home',
  standalone: false,
  templateUrl: './home.component.html',
  styleUrl: './home.component.scss'
})
export class HomeComponent implements OnInit {
  personalInfo: PersonalInfo | null = null;
  featuredProjects: Project[] = [];
  featuredSkills: Skill[] = [];
  loading: boolean = false;

  constructor(
    private personalInfoService: PersonalInfoService,
    private projectService: ProjectService,
    private skillService: SkillService
  ) {}

  ngOnInit(): void {
    this.loadData();
  }

  loadData(): void {
    this.loading = true;

    // Cargar info personal
    this.personalInfoService.get().subscribe({
      next: (data) => {
        this.personalInfo = data;
      },
      error: (error) => console.error('Error cargando info personal:', error)
    });

    // Cargar proyectos destacados
    this.projectService.getAll().subscribe({
      next: (data) => {
        this.featuredProjects = data.filter(p => p.featured).slice(0, 3);
        this.loading = false;
      },
      error: (error) => {
        console.error('Error cargando proyectos:', error);
        this.loading = false;
      }
    });

    // Cargar habilidades destacadas
    this.skillService.getAll().subscribe({
      next: (data) => {
        this.featuredSkills = data.filter(s => s.featured && s.category === 'technical').slice(0, 6);
      },
      error: (error) => console.error('Error cargando habilidades:', error)
    });
  }

  getProfileImageUrl(): string {
    if (!this.personalInfo?.profile_image) {
      return '';
    }
    
    if (this.personalInfo.profile_image.startsWith('http')) {
      return this.personalInfo.profile_image;
    }
    
    return `http://localhost:8000/${this.personalInfo.profile_image}`;
  }

  scrollToSection(sectionId: string): void {
    const element = document.getElementById(sectionId);
    if (element) {
      element.scrollIntoView({ behavior: 'smooth' });
    }
  }
}