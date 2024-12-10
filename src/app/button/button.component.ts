import { HttpClient } from '@angular/common/http';
import { Component } from '@angular/core';

@Component({
  selector: 'app-button',
  standalone: true,
  imports: [],
  templateUrl: './button.component.html',
  styleUrl: './button.component.css'
})
export class ButtonComponent {
  configData = {
    maxTicketCapacity: 0,
    totalTickets: 0,
    ticketReleaseRate: 0,
    customerRetrievalRate: 0
  };

  private configUrl = 'http://localhost:7070/config/update';  
  private startUrl = 'http://localhost:7070/config/start';    
  private stopUrl = 'http://localhost:7070/config/stop';      
  constructor(private http: HttpClient) {}

  // Save configuration to the backend (without starting threads)
  onSubmit() {
    this.configure();
  }

  configure() {
    this.http.post(this.configUrl, this.configData).subscribe(
      response => {
        console.log('Configuration saved successfully');
      },
      error => {
        console.error('Error saving configuration', error);
      }
    );
  }

  // Starts the program (threads) when the start button is clicked
  start() {
    this.http.post(this.startUrl, {}).subscribe(
      response => {
        console.log('Started ticket selling and buying');
      },
      error => {
        console.error('Error starting threads', error);
      }
    );
  }

  // Stops the threads when the stop button is clicked
  stop() {
    this.http.post(this.stopUrl, {}).subscribe(
      response => {
        console.log('Stopped ticket selling and buying');
      },
      error => {
        console.error('Error stopping threads', error);
      }
    );
  }
}