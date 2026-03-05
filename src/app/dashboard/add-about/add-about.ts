import { Component, OnInit, ChangeDetectorRef } from '@angular/core';
import { FormBuilder, FormGroup, ReactiveFormsModule, Validators } from '@angular/forms';
import { CommonModule } from '@angular/common';
import { AboutServices } from '../../core/services/about.services';
import { IAbout } from '../../core/models/about.model';

@Component({
  selector: 'app-add-about',
  standalone: true,
  imports: [ReactiveFormsModule, CommonModule],
  templateUrl: './add-about.html',
  styleUrls: ['./add-about.css']
})
export class AddAbout implements OnInit {
  aboutForm!: FormGroup;
  abouts: IAbout[] = [];
  selectedFile: File | null = null;
  editingId: string | null = null;
  successMessage: string = '';
  errorMessage: string = '';

  constructor(
    private fb: FormBuilder,
    private aboutService: AboutServices,
    private cdr: ChangeDetectorRef 
  ) {}

  ngOnInit() {
    this.initForm();
    this.loadAbouts();
  }

  initForm() {
    this.aboutForm = this.fb.group({
      heading:     ['', Validators.required],
      description: ['', Validators.required]
    });
  }

  loadAbouts() {
    this.aboutService.getAbouts().subscribe(res => {
      this.abouts = res;
      this.cdr.detectChanges();
    });
  }

  onFileSelected(event: Event) {
    const input = event.target as HTMLInputElement;
    this.selectedFile = input.files?.[0] || null;
  }

  onSubmit() {
    if (this.aboutForm.invalid) return;

    const formData = new FormData();
    formData.append('heading', this.aboutForm.value.heading);
    formData.append('description', this.aboutForm.value.description);
    if (this.selectedFile) formData.append('image', this.selectedFile);

    if (this.editingId) {
      this.aboutService.updateAbout(this.editingId, formData).subscribe(() => {
        this.successMessage = 'Updated successfully! ✨';
        this.resetForm();
      });
    } else {
      this.aboutService.createAbout(formData).subscribe(() => {
        this.successMessage = 'Added successfully! ✨';
        this.resetForm();
      });
    }
  }

  editAbout(about: IAbout) {
    this.editingId = about._id!;
    this.aboutForm.patchValue({
      heading:     about.heading,
      description: about.description
    });
  }

  deleteAbout(id: string) {
    if (confirm('Are you sure?')) {
      this.aboutService.deleteAbout(id).subscribe(() => {
        this.loadAbouts();
      });
    }
  }

  resetForm() {
    this.aboutForm.reset();
    this.selectedFile = null;
    this.editingId = null;
    this.loadAbouts();
    setTimeout(() => this.successMessage = '', 3000);
  }
}