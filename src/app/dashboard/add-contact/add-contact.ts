import { Component, OnInit, ChangeDetectorRef } from '@angular/core';
import { FormBuilder, FormGroup, ReactiveFormsModule, Validators } from '@angular/forms';
import { CommonModule } from '@angular/common';
import { IContact } from '../../core/models/contact.model';
import { ContactService } from '../../core/services/contact.services';

@Component({
  selector: 'app-add-contact',
  standalone: true,
  imports: [ReactiveFormsModule, CommonModule],
  templateUrl: './add-contact.html',
  styleUrls: ['./add-contact.css']
})
export class AddContact implements OnInit {
  contactForm!: FormGroup;
  contacts: IContact[] = [];
  editingId: string | null = null;
  successMessage: string = '';

  examples = [
    { type: 'Email',    icon: 'envelope',   hint: 'your@email.com' },
    { type: 'Phone',    icon: 'phone',      hint: '+20 1XX XXX XXXX' },
    { type: 'LinkedIn', icon: 'linkedin',   hint: 'https://linkedin.com/in/...' },
    { type: 'GitHub',   icon: 'github',     hint: 'https://github.com/...' },
    { type: 'Facebook', icon: 'facebook',   hint: 'https://facebook.com/...' },
    { type: 'Location', icon: 'map-marker-alt', hint: 'Cairo, Egypt' },
  ];

  constructor(
    private fb: FormBuilder,
    private contactService: ContactService,
    private cdr: ChangeDetectorRef
  ) {}

  ngOnInit() {
    this.contactForm = this.fb.group({
      type:  ['', Validators.required],
      value: ['', Validators.required],
      icon:  ['', Validators.required],
      link:  ['']
    });
    this.loadContacts();
  }

  loadContacts() {
    this.contactService.getContacts().subscribe(res => {
      this.contacts = res;
      this.cdr.detectChanges();
    });
  }

  selectExample(ex: any) {
    this.contactForm.patchValue({ type: ex.type, icon: ex.icon });
  }

  onSubmit() {
    if (this.contactForm.invalid) return;
    const data = this.contactForm.value;

    if (this.editingId) {
      this.contactService.updateContact(this.editingId, data).subscribe(() => this.resetForm());
    } else {
      this.contactService.createContact(data).subscribe(() => this.resetForm());
    }
  }

  editContact(c: IContact) {
    this.editingId = c._id!;
    this.contactForm.patchValue(c);
  }

  deleteContact(id: string) {
    if (confirm('Delete this contact?')) {
      this.contactService.deleteContact(id).subscribe(() => this.loadContacts());
    }
  }

  getIconClass(icon: string): string {
    if (!icon) return 'fas fa-link';
    const brands = ['linkedin', 'github', 'facebook', 'instagram', 'twitter', 'youtube', 'whatsapp', 'telegram'];
    return brands.some(b => icon.toLowerCase().includes(b)) ? `fab fa-${icon}` : `fas fa-${icon}`;
  }

  resetForm() {
    this.contactForm.reset();
    this.editingId = null;
    this.successMessage = 'Done! ✨';
    this.loadContacts();
    setTimeout(() => this.successMessage = '', 3000);
  }
}