import { Component } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { Navbar } from '../../components/navbar/navbar';

@Component({
  selector: 'app-chat-bot',
  imports: [Navbar, FormsModule],
  templateUrl: './chat-bot.html',
  styleUrl: './chat-bot.css',
})
export class ChatBOT {
  conversations = [
    'Consulta sobre Colombia',
    'Indicadores nacionales',
    'Comparar departamentos',
  ];

  activeConversation = this.conversations[0];
  conversationToDelete: string | null = null;
  question = '';

  selectConversation(conversation: string): void {
    this.activeConversation = conversation;
  }

  submitQuestion(): void {
    const question = this.question.trim();

    if (!question) {
      return;
    }

    const firstPhrase = question.match(/^[^.!?]+[.!?]?/)?.[0].trim() ?? question;

    this.conversations = [
      firstPhrase,
      ...this.conversations.filter((conversation) => conversation !== firstPhrase),
    ];
    this.activeConversation = firstPhrase;
    this.question = '';
  }

  requestConversationDeletion(conversation: string): void {
    this.conversationToDelete = conversation;
  }

  cancelConversationDeletion(): void {
    this.conversationToDelete = null;
  }

  confirmConversationDeletion(): void {
    if (!this.conversationToDelete) {
      return;
    }

    this.conversations = this.conversations.filter(
      (conversation) => conversation !== this.conversationToDelete,
    );

    if (this.activeConversation === this.conversationToDelete) {
      this.activeConversation = this.conversations[0] ?? '';
    }

    this.conversationToDelete = null;
  }
}
