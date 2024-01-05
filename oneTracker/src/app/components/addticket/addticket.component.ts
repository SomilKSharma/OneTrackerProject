import { Component } from '@angular/core';
import { TicketService } from '../../services/ticket.service';
import { Router } from '@angular/router';

@Component({
  selector: 'app-addticket',
  templateUrl: './addticket.component.html',
  styleUrls: ['./addticket.component.scss']
})
export class AddticketComponent {
  ticket = {
    "id": 0,
    "department": "",
    "category": "",
    "subCategory": "",
    "status": "",
    "customer": "",
    "issueTime": "2024-01-05T00:00:00.000Z", // Update with the current date and time
    "age": 0, // in days
    "lastModifiedDate": "2024-01-05T00:00:00.000Z", // Update with the current date and time
    "rootCauseAnalysis": "",
    "LISCustomer": "LIS Customer Name",
    "subjectIssue": "Brief description of the subject/issue",
    "issueDescription": "Detailed description of the issue",
    "emailID": "customer@email.com",
    "escalationEmailID": "escalation@email.com",
    "teamsCallLink": "Teams Call Link"
  };

  constructor(private ticketService: TicketService, private router:Router) {}

  createTicket(): void {
    // Set the issueTime to the current date and time
    this.ticket.issueTime = String(new Date());
    this.ticket.lastModifiedDate = String(new Date());
    
    this.ticketService.createTicket(this.ticket).subscribe(
      (createdTicket) => {
        console.log('Ticket created successfully:', createdTicket);
        // Optionally, you can redirect to a different page or perform other actions
        setTimeout(() => {
          this.router.navigate(['/dashboard/viewalltickets']);
        }, 500);      },
      (error) => {
        console.error('Error creating ticket:', error);
      }
    );
  }
}
