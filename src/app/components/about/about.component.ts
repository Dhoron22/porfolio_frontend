import { Component, OnInit } from '@angular/core';
import { PersonalInfoService } from '../../services/personal-info.service';
import { PersonalInfo } from '../../models/personal-info';

@Component({
  selector: 'app-about',
  standalone: false,
  templateUrl: './about.component.html',
  styleUrl: './about.component.scss'
})
export class AboutComponent implements OnInit {
  personalInfo: PersonalInfo | null = null;
  loading: boolean = false;
  error: string = '';

  constructor(private personalInfoService: PersonalInfoService) {}

  ngOnInit(): void {
    this.loadPersonalInfo();
  }

  loadPersonalInfo(): void {
    this.loading = true;
    this.error = '';

    this.personalInfoService.get().subscribe({
      next: (data) => {
        // Tu backend retorna un solo objeto, no un array
        this.personalInfo = data;
        this.loading = false;
        console.log('✅ Personal Info cargada:', data);
      },
      error: (error) => {
        this.error = 'Error al cargar información personal';
        this.loading = false;
        console.error('❌ Error:', error);
      }
    });
  }
}
