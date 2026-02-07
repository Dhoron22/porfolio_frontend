import { Component, OnInit } from '@angular/core';
import { EducationService } from '../../services/eduction.service';
import { Education } from '../../models/education';

@Component({
  selector: 'app-education',
  standalone: false,
  templateUrl: './education.component.html',
  styleUrl: './education.component.scss'
})
export class EducationComponent implements OnInit {
  education: Education[] = [];
  loading: boolean = false;
  error: string = '';

  constructor(private educationService: EducationService) {}

  ngOnInit(): void {
    this.loadEducation();
  }

  loadEducation(): void {
    this.loading = true;
    this.error = '';

    this.educationService.getAll().subscribe({
      next: (data) => {
        this.education = data;
        this.loading = false;
        console.log('✅ Educación cargada:', data);
      },
      error: (error) => {
        this.error = 'Error al cargar formación académica';
        this.loading = false;
        console.error('❌ Error:', error);
      }
    });
  }
}
