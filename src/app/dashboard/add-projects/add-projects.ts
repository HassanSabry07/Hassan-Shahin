import { Component, OnInit, ChangeDetectorRef } from '@angular/core';
import { FormBuilder, FormGroup, ReactiveFormsModule, Validators } from '@angular/forms';
import { CommonModule } from '@angular/common';
import { ProjectsServices } from '../../core/services/projects.services';
import { IProjects } from '../../core/models/projects.model';

@Component({
  selector: 'app-add-projects',
  standalone: true,
  imports: [ReactiveFormsModule, CommonModule],
  templateUrl: './add-projects.html',
  styleUrls: ['./add-projects.css']
})
export class AddProjects implements OnInit {
  projectForm!: FormGroup;
  projects: IProjects[] = [];
  selectedFile: File | null = null;
  editingId: string | null = null;
  successMessage: string = '';
  imageBaseUrl = 'http://localhost:3000/uploads/';

  constructor(
    private fb: FormBuilder,
    private projectsService: ProjectsServices,
    private cdr: ChangeDetectorRef
  ) {}

  ngOnInit() {
    this.projectForm = this.fb.group({
      title: ['', Validators.required],
      description: ['', Validators.required],
      link: [''],
      tools: ['']
    });
    this.loadProjects();
  }

  loadProjects() {
    this.projectsService.getProjects().subscribe(res => {
      this.projects = res;
      this.cdr.detectChanges();
    });
  }

  onFileSelected(event: Event) {
    const input = event.target as HTMLInputElement;
    this.selectedFile = input.files?.[0] || null;
  }

  onSubmit() {
    if (this.projectForm.invalid) return;
    const formData = new FormData();
    Object.entries(this.projectForm.value).forEach(([key, value]) => {
      if (value) formData.append(key, String(value));
    });
    if (this.selectedFile) formData.append('image', this.selectedFile);

    if (this.editingId) {
      this.projectsService.updateProject(this.editingId, formData).subscribe(() => this.resetForm());
    } else {
      this.projectsService.createProject(formData).subscribe(() => this.resetForm());
    }
  }

  editProject(p: IProjects) {
    this.editingId = p._id!;
    this.projectForm.patchValue(p);
  }

  deleteProject(id: string) {
    if (confirm('Delete this project?')) {
      this.projectsService.deleteProject(id).subscribe(() => this.loadProjects());
    }
  }

  resetForm() {
    this.projectForm.reset();
    this.selectedFile = null;
    this.editingId = null;
    this.successMessage = 'Done! ✨';
    this.loadProjects();
    setTimeout(() => this.successMessage = '', 3000);
  }
}