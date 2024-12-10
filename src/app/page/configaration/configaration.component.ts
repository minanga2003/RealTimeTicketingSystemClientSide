import { Component } from '@angular/core';
import { HttpClient, HttpClientModule } from '@angular/common/http';
import { FormsModule } from '@angular/forms';
import { CommonModule } from '@angular/common';

@Component({
  selector: 'app-configaration',
  standalone: true,
  imports: [FormsModule, CommonModule, HttpClientModule],
  templateUrl: './configaration.component.html',
  styleUrls: ['./configaration.component.css']
})
export class ConfigarationComponent {
  public ticketData = {
    maxTicketCapacity: "",
    totalTickets: "",
    ticketReleaseRate: "",
    customerRetrievalRate: ""
  };

  public errorMessage: string = '';

  constructor(private http: HttpClient) { }

  // Method to load the previous configuration when the button is clicked
  loadPreviousConfig() {
    this.http.get<any>('http://localhost:7070/config/get')
      .subscribe(
        (response) => {
          if (response) {
            this.ticketData.maxTicketCapacity = response.maxTicketCapacity;
            this.ticketData.totalTickets = response.totalTickets;
            this.ticketData.ticketReleaseRate = response.ticketReleaseRate;
            this.ticketData.customerRetrievalRate = response.customerRetrievalRate;
          }
        },
        (error) => {
          console.error('Error fetching configuration:', error);
          this.errorMessage = 'Error fetching configuration data.';
        }
      );
  }

  configuration() {
    // Convert values to numbers and validate them
    const maxTicketCapacity = parseInt(this.ticketData.maxTicketCapacity, 10);
    const totalTickets = parseInt(this.ticketData.totalTickets, 10);
    const ticketReleaseRate = parseInt(this.ticketData.ticketReleaseRate, 10);
    const customerRetrievalRate = parseInt(this.ticketData.customerRetrievalRate, 10);
  
    // Client-side validation before sending to the backend
    if (this.isValidData(maxTicketCapacity, totalTickets, ticketReleaseRate, customerRetrievalRate)) {
      this.errorMessage = '';  // Clear any previous error messages
  
      console.log("Sending configuration:", this.ticketData);
      this.http.post<{ message: string }>('http://localhost:7070/config/update', this.ticketData)
        .subscribe(
          (response) => {
            alert(response.message);  // Handle success
          },
          (error) => {
            console.error("Can't configuration process", error);
            alert("Can't configuration process");  // Handle error
          }
        );
    }
  }

  isValidData(maxTicketCapacity: number, totalTickets: number, ticketReleaseRate: number, customerRetrievalRate: number): boolean {
    // Validate each field to ensure it's not empty, zero, or malformed
    if (maxTicketCapacity <= 0 || isNaN(maxTicketCapacity)) {
      this.errorMessage = 'Max Ticket Capacity should be a positive number.';
      return false;
    }
  
    if (totalTickets <= 0 || isNaN(totalTickets)) {
      this.errorMessage = 'Total Tickets should be a positive number.';
      return false;
    }
  
    if (ticketReleaseRate <= 0 || isNaN(ticketReleaseRate)) {
      this.errorMessage = 'Ticket Release Rate should be a positive number.';
      return false;
    }
  
    if (customerRetrievalRate <= 0 || isNaN(customerRetrievalRate)) {
      this.errorMessage = 'Customer Retrieval Rate should be a positive number.';
      return false;
    }
      return true;
  }
}
