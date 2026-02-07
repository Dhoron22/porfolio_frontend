import { Component, OnInit } from '@angular/core';
import { LanguageService } from '../../services/language.service';
import { Language } from '../../models/language';

@Component({
  selector: 'app-languages',
  standalone: false,
  templateUrl: './languages.component.html',
  styleUrl: './languages.component.scss'
})
export class LanguagesComponent implements OnInit {
  languages: Language[] = [];
  loading: boolean = false;
  error: string = '';

  constructor(private languageService: LanguageService) {}

  ngOnInit(): void {
    this.loadLanguages();
  }

  loadLanguages(): void {
    this.loading = true;
    this.error = '';

    this.languageService.getAll().subscribe({
      next: (data) => {
        this.languages = data;
        this.loading = false;
        console.log('✅ Idiomas cargados:', data);
      },
      error: (error) => {
        this.error = 'Error al cargar idiomas';
        this.loading = false;
        console.error('❌ Error:', error);
      }
    });
  }

  getProficiencyWidth(proficiency: string): string {
    const levels: { [key: string]: string } = {
      'Nativo': '100%',
      'Avanzado': '85%',
      'Intermedio': '65%',
      'Basico': '40%'
    };
    return levels[proficiency] || '50%';
  }

  getProficiencyColor(proficiency: string): string {
    const colors: { [key: string]: string } = {
      'Nativo': '#2e7d32',
      'Avanzado': '#1976d2',
      'Intermedio': '#f57c00',
      'Basico': '#c62828'
    };
    return colors[proficiency] || '#757575';
  }
}
