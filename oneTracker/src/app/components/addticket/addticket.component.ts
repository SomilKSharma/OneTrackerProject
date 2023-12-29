import { Component } from '@angular/core';
import { TicketService } from '../../services/ticket.service';
import { Router } from '@angular/router';

@Component({
  selector: 'app-addticket',
  templateUrl: './addticket.component.html',
  styleUrls: ['./addticket.component.scss']
})
export class AddticketComponent {
  newTicket = {
    id: 0,
    department: "",
    category: "",
    subCategory: "",
    status: "",
    customer: "",
    issueTime: new Date(),
    age: 0, // in days
    lastModifiedDate: "",
    rootCauseAnalysis: '',
  };

  constructor(private ticketService: TicketService, private router:Router) {}

  createTicket(): void {
    // You may want to validate form data before sending the request

    this.ticketService.createTicket(this.newTicket).subscribe(
      (createdTicket) => {
        console.log('Ticket created successfully:', createdTicket);
        // Optionally, you can redirect to a different page or perform other actions
        this.router.navigate(['/dashboard/viewalltickets'])
      },
      (error) => {
        console.error('Error creating ticket:', error);
      }
    );
  }
}
