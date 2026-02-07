import { Component, OnInit } from '@angular/core';
import { SkillService } from '../../services/skill.service';
import { Skill } from '../../models/skill';

@Component({
  selector: 'app-skills',
  standalone: false,
  templateUrl: './skills.component.html',
  styleUrl: './skills.component.scss'
})
export class SkillsComponent implements OnInit {
  skills: Skill[] = [];
  loading: boolean = false;
  error: string = '';

  // Filtros
  selectedCategory: string = 'all';
  selectedSubcategory: string = 'all';

  constructor(private skillService: SkillService) {}

  ngOnInit(): void {
    this.loadSkills();
  }

  loadSkills(): void {
    this.loading = true;
    this.error = '';

    this.skillService.getAll().subscribe({
      next: (data) => {
        this.skills = data;
        this.loading = false;
        console.log('✅ Habilidades cargadas:', data);
      },
      error: (error) => {
        this.error = 'Error al cargar habilidades';
        this.loading = false;
        console.error('❌ Error:', error);
      }
    });
  }

  get filteredSkills(): Skill[] {
    return this.skills.filter(skill => {
      const categoryMatch = this.selectedCategory === 'all' || skill.category === this.selectedCategory;
      const subcategoryMatch = this.selectedSubcategory === 'all' || skill.subcategory === this.selectedSubcategory;
      return categoryMatch && subcategoryMatch;
    });
  }

  get technicalSkills(): Skill[] {
    return this.filteredSkills.filter(s => s.category === 'technical');
  }

  get softSkills(): Skill[] {
    return this.filteredSkills.filter(s => s.category === 'soft');
  }

  get toolSkills(): Skill[] {
    return this.filteredSkills.filter(s => s.category === 'tool');
  }

  get subcategories(): string[] {
    if (this.selectedCategory === 'all') return [];

    const subcats = this.skills
      .filter(s => s.category === this.selectedCategory && s.subcategory)
      .map(s => s.subcategory!);

    return [...new Set(subcats)];
  }

  getProficiencyColor(proficiency: number | null): string {
  if (!proficiency && proficiency !== 0) return '#9e9e9e';

  if (proficiency >= 80) return '#2e7d32';
  if (proficiency >= 60) return '#1976d2';
  if (proficiency >= 40) return '#f57c00';
  return '#c62828';
}

}
