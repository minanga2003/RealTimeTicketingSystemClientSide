import { CommonModule } from '@angular/common';
import { Component, OnDestroy, OnInit } from '@angular/core';
import SockJS from 'sockjs-client';
import * as Stomp from 'stompjs';

@Component({
  selector: 'app-output',
  standalone: true,
  templateUrl: './output.component.html',
  styleUrls: ['./output.component.css'],
  imports: [CommonModule]
})
export class OutputComponent implements OnInit, OnDestroy {
  private socketClient: Stomp.Client | null = null;
  public messages: string[] = [];

  ngOnInit() {
    this.connectWebSocket();
  }

  ngOnDestroy() {
    if (this.socketClient) {
      this.socketClient.disconnect(() => {
        console.log('WebSocket connection closed');
      });
    }
  }

  connectWebSocket() {
    const ws = new SockJS('http://localhost:7070/chat'); // WebSocket endpoint
    this.socketClient = Stomp.over(ws);

    this.socketClient.connect({}, () => {
      console.log('WebSocket connected');

      this.socketClient?.subscribe('/topic/tickets', (message: { body: string }) => {
        try {
          // Parse the received message body
          const parsedMessage = JSON.parse(message.body);

          // Extract and display the payload
          if (parsedMessage.payload) {
            const messageText = parsedMessage.payload;
            this.messages.push(messageText);
          } else {
            console.error('Invalid message format:', parsedMessage);
          }
        } catch (error) {
          console.error('Failed to parse WebSocket message:', message.body, error);
        }
      });
    });
  }

  sendMessage() {
    if (this.socketClient) {
      this.socketClient.send(
        '/app/sendMessage',
        {},
        JSON.stringify({ sender: 'Client', content: 'Hello from Angular!' })
      );
      console.log('Message sent!');
    } else {
      console.error('WebSocket client is not connected.');
    }
  }
}
