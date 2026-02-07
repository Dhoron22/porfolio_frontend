import { Component, OnInit } from '@angular/core';
import { WorkExperienceService } from '../../services/work-experience.service';
import { WorkExperience } from '../../models/work-experience';

@Component({
  selector: 'app-work-experience',
  standalone: false,
  templateUrl: './work-experience.component.html',
  styleUrl: './work-experience.component.scss'
})
export class WorkExperienceComponent implements OnInit {
  experiences: WorkExperience[] = [];
  loading: boolean = false;
  error: string = '';

  constructor(private workExperienceService: WorkExperienceService) {}

  ngOnInit(): void {
    this.loadExperiences();
  }

  loadExperiences(): void {
    this.loading = true;
    this.error = '';

    this.workExperienceService.getAll().subscribe({
      next: (data) => {
        this.experiences = data;
        this.loading = false;
        console.log('✅ Experiencia laboral cargada:', data);
      },
      error: (error) => {
        this.error = 'Error al cargar experiencia laboral';
        this.loading = false;
        console.error('❌ Error:', error);
      }
    });
  }
}
