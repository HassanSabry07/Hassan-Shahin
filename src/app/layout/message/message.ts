import { Component } from '@angular/core';
import { CommonModule } from '@angular/common';
import { ReactiveFormsModule, FormBuilder, FormGroup, Validators } from '@angular/forms';
import { MessageServices } from '../../core/services/message.services';

@Component({
  selector: 'app-message',
  standalone: true,
  imports: [CommonModule, ReactiveFormsModule],
  templateUrl: './message.html',
  styleUrl: './message.css',
})
export class MessageComponent {
  form: FormGroup;
  submitted = false;
  loading = false;

  constructor(private fb: FormBuilder, private messageService: MessageServices) {
    this.form = this.fb.group({
      name:    ['', Validators.required],
      email:   ['', [Validators.required, Validators.email]],
      message: ['', Validators.required]
    });
  }

  onSubmit() {
    if (this.form.invalid) return;
    this.loading = true;
    this.messageService.sendMessage(this.form.value).subscribe({
      next: () => {
        this.submitted = true;
        this.loading = false;
        this.form.reset();
      },
      error: () => { this.loading = false; }
    });
  }
}