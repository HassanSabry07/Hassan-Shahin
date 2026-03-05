import { Component, OnInit, ChangeDetectorRef } from '@angular/core';
import { FormBuilder, FormGroup, ReactiveFormsModule, Validators } from '@angular/forms';
import { CommonModule } from '@angular/common';
import { ExperinceServices } from '../../core/services/experince.services';
import { IExperince } from '../../core/models/Experince.model ';

@Component({
  selector: 'app-add-experince',
  standalone: true,
  imports: [ReactiveFormsModule, CommonModule],
  templateUrl: './add-experince.html',
  styleUrls: ['./add-experince.css']
})
export class AddExperince implements OnInit {
  expForm!: FormGroup;
  experiences: IExperince[] = [];
  selectedFile: File | null = null;
  editingId: string | null = null;
  successMessage: string = '';
  imageBaseUrl = 'http://localhost:3000/uploads/';

  constructor(
    private fb: FormBuilder,
    private expService: ExperinceServices,
    private cdr: ChangeDetectorRef
  ) {}

  ngOnInit() {
    this.expForm = this.fb.group({
      company: ['', Validators.required],
      role: ['', Validators.required],
      startDate: ['', Validators.required],
      endDate: [''],
      description: ['']
    });
    this.loadExperiences();
  }

  loadExperiences() {
    this.expService.getExperiences().subscribe(res => {
      this.experiences = res;
      this.cdr.detectChanges();
    });
  }

  onFileSelected(event: Event) {
    const input = event.target as HTMLInputElement;
    this.selectedFile = input.files?.[0] || null;
  }

  onSubmit() {
    if (this.expForm.invalid) return;

    const formData = new FormData();
    Object.entries(this.expForm.value).forEach(([key, value]) => {
      if (value) formData.append(key, String(value));
    });
    if (this.selectedFile) formData.append('image', this.selectedFile);

    if (this.editingId) {
      this.expService.updateExperience(this.editingId, formData).subscribe(() => this.resetForm());
    } else {
      this.expService.createExperience(formData).subscribe(() => this.resetForm());
    }
  }

  editExperience(exp: IExperince) {
    this.editingId = exp._id!;
    this.expForm.patchValue({
      company: exp.company,
      role: exp.role,
      startDate: exp.startDate ? exp.startDate.split('T')[0] : '',
      endDate: exp.endDate ? exp.endDate.split('T')[0] : '',
      description: exp.description
    });
  }

  deleteExperience(id: string) {
    if (confirm('Delete this experience?')) {
      this.expService.deleteExperience(id).subscribe(() => this.loadExperiences());
    }
  }

  formatDate(date: string | undefined): string {
    if (!date) return 'Present';
    return new Date(date).toLocaleDateString('en-US', { year: 'numeric', month: 'short' });
  }

  resetForm() {
    this.expForm.reset();
    this.selectedFile = null;
    this.editingId = null;
    this.successMessage = 'Done! ✨';
    this.loadExperiences();
    setTimeout(() => this.successMessage = '', 3000);
  }
}