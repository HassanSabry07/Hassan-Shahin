import { Component, OnInit, ChangeDetectorRef } from '@angular/core';
import { FormBuilder, FormGroup, ReactiveFormsModule, Validators } from '@angular/forms';
import { CommonModule } from '@angular/common';
import { SkillsServices } from '../../core/services/skills.services';

@Component({
  selector: 'app-add-skills',
  standalone: true,
  imports: [ReactiveFormsModule, CommonModule],
  templateUrl: './add-skills.html',
  styleUrls: ['./add-skills.css']
})
export class AddSkills implements OnInit {
  skillForm!: FormGroup;
  skills: any[] = [];
  editingId: string | null = null;
  successMessage: string = '';

  private brandIcons = [
    'angular', 'react', 'vuejs', 'node-js', 'node', 'js',
    'html5', 'css3', 'sass', 'bootstrap', 'github', 'gitlab',
    'git-alt', 'docker', 'python', 'java', 'php', 'laravel',
    'wordpress', 'aws', 'google', 'microsoft', 'linux', 'ubuntu',
    'npm', 'yarn', 'figma', 'sketch', 'trello', 'slack',
    'twitter', 'facebook', 'bitbucket', 'swift', 'android',
    'apple', 'raspberry-pi'
  ];

  constructor(
    private fb: FormBuilder,
    public skillService: SkillsServices,
    private cdr: ChangeDetectorRef
  ) {}

  ngOnInit() {
    this.skillForm = this.fb.group({
      name: ['', Validators.required],
      level: ['', Validators.required],
      icon: ['', Validators.required]
    });
    this.loadSkills();
  }

  getIconClass(icon: string): string {
    if (!icon) return 'fas fa-code';
    const isBrand = this.brandIcons.some(b => icon.toLowerCase().includes(b));
    return isBrand ? `fab fa-${icon}` : `fas fa-${icon}`;
  }

  loadSkills() {
    this.skillService.getSkills().subscribe(res => {
      this.skills = res;
      this.cdr.detectChanges();
    });
  }

  onSubmit() {
    if (this.skillForm.invalid) return;

    // ✅ بنبعت JSON مش FormData
    const data = {
      name: this.skillForm.value.name,
      level: this.skillForm.value.level,
      icon: this.skillForm.value.icon
    };

    if (this.editingId) {
      this.skillService.updateSkill(this.editingId, data).subscribe(() => this.resetForm());
    } else {
      this.skillService.createSkill(data).subscribe(() => this.resetForm());
    }
  }

  editSkill(skill: any) {
    this.editingId = skill._id;
    this.skillForm.patchValue(skill);
  }

  deleteSkill(id: string) {
    if (confirm('Delete this skill?')) {
      this.skillService.deleteSkill(id).subscribe(() => this.loadSkills());
    }
  }

  resetForm() {
    this.skillForm.reset();
    this.editingId = null;
    this.successMessage = 'Done! ✨';
    this.loadSkills();
    setTimeout(() => this.successMessage = '', 3000);
  }
}