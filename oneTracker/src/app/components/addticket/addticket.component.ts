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
    "ticketClosedIn4":false,
    category: "",
    subCategory: "",
    status: "",
    customer: "",
    issueTime:new Date(),
    age: 0, 
    lastModifiedDate: new Date(),
    rootCauseAnalysis: '',
  };

  constructor(private ticketService: TicketService, private router:Router) {}

  createTicket(): void {
    // Set the issueTime to the current date and time
    this.newTicket.issueTime = new Date();
    this.newTicket.lastModifiedDate = new Date();
    
    this.ticketService.createTicket(this.newTicket).subscribe(
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
