import { Component, OnInit, ChangeDetectorRef } from '@angular/core';
import { FormBuilder, FormGroup, ReactiveFormsModule, FormsModule, Validators } from '@angular/forms';
import { HomeServices } from '../../core/services/home.services';
import { CommonModule } from '@angular/common';
import { IHome } from '../../core/models/home.model';

@Component({
  selector: 'app-add-home',
  standalone: true,
  imports: [ReactiveFormsModule, FormsModule, CommonModule],
  templateUrl: './add-home.html',
  styleUrls: ['./add-home.css']
})
export class AddHome implements OnInit {
  successMessage: string = '';
  errorMessage:   string = '';
  homeForm!: FormGroup;
  homes: IHome[] = [];
  selectedFile: File | null = null;
  editingId: string | null = null;

  roles: string[] = [];
  newRole: string = '';

  constructor(
    private fb: FormBuilder,
    private homeService: HomeServices,
    private cdr: ChangeDetectorRef
  ) {}

  ngOnInit() {
    this.initForm();
    this.loadHomes();
  }

  initForm() {
    this.homeForm = this.fb.group({
      title:      ['', Validators.required],
      content:    ['', Validators.required],
      cvURL:      [''],
      projectURL: [''],
      linkedIn:   [''],
      gitHub:     [''],
      email:      ['', Validators.email],
      phone:      ['']
    });
  }

  loadHomes() {
    this.homeService.getHomes().subscribe(res => {
      this.homes = res;
      this.cdr.detectChanges();
    });
  }

  addRole() {
    const trimmed = this.newRole.trim();
    if (trimmed && !this.roles.includes(trimmed)) {
      this.roles.push(trimmed);
    }
    this.newRole = '';
  }

  removeRole(index: number) {
    this.roles.splice(index, 1);
  }

  onFileSelected(event: Event) {
    const input = event.target as HTMLInputElement;
    this.selectedFile = input.files?.[0] || null;
  }

  onSubmit() {
    if (this.homeForm.invalid) return;

    const formData = new FormData();
    Object.entries(this.homeForm.value).forEach(([key, value]) => {
      if (value) formData.append(key, String(value));
    });

    formData.append('roles', JSON.stringify(this.roles));
    if (this.selectedFile) formData.append('image', this.selectedFile);

    if (this.editingId) {
      this.homeService.updateHome(this.editingId, formData).subscribe(() => {
        this.successMessage = 'Updated successfully! ✨';
        this.resetForm();
      });
    } else {
      this.homeService.createHome(formData).subscribe(() => {
        this.successMessage = 'Added successfully! ✨';
        this.resetForm();
      });
    }
  }

  editHome(home: IHome) {
    this.roles = []; // reset أول
    this.editingId = home._id!;
    this.homeForm.patchValue(home);
    this.roles = home.roles ? [...home.roles] : [];
    this.cdr.detectChanges();
  }

  deleteHome(id: string) {
    if (confirm('Delete this entry?')) {
      this.homeService.deleteHome(id).subscribe(() => this.loadHomes());
    }
  }

  resetForm() {
    this.homeForm.reset();
    this.selectedFile = null;
    this.editingId = null;
    this.roles = [];
    this.newRole = '';
    this.loadHomes();
    setTimeout(() => this.successMessage = '', 3000);
  }
}