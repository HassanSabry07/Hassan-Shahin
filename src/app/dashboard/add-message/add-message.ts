import { Component, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { MessageServices } from '../../core/services/message.services';
import { IMessage } from '../../core/models/message.model';

@Component({
  selector: 'app-add-message',
  standalone: true,
  imports: [CommonModule],
  templateUrl: './add-message.html',
  styleUrl: './add-message.css',
})
export class AddMessage implements OnInit {
  messages: IMessage[] = [];
  loading = true;

  constructor(private messageService: MessageServices) {}

  ngOnInit() {
    this.loadMessages();
  }

  loadMessages() {
    this.messageService.getMessages().subscribe(res => {
      this.messages = res;
      this.loading = false;
    });
  }

  markAsRead(id: string) {
    this.messageService.markAsRead(id).subscribe(() => this.loadMessages());
  }

  deleteMessage(id: string) {
    if (confirm('Delete this message?')) {
      this.messageService.deleteMessage(id).subscribe(() => this.loadMessages());
    }
  }

  get unreadCount(): number {
    return this.messages.filter(m => !m.isRead).length;
  }
}