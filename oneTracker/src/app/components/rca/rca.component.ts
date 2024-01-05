import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { TicketService } from '../../services/ticket.service';

@Component({
  selector: 'app-rca',
  templateUrl: './rca.component.html',
  styleUrl: './rca.component.scss'
})
export class RcaComponent implements OnInit {
  editing: boolean = true;
  ticket={
    id: 0,
    department: "",
    "ticketClosedIn4":false,
    customer: "",
    issueTime: new Date(),
    age: 0, 
    lastModifiedDate: new Date(),
    rootCauseAnalysis: '',
  }; 

  constructor(private route: ActivatedRoute, private ticketService: TicketService, private router:Router) {}

  ngOnInit() {
    // Retrieve the 'id' parameter from the route
    this.route.paramMap.subscribe(params => {
      const ticketId = parseInt(params.get('id')!);

      // Fetch ticket details using the TicketService
      this.fetchTicket(ticketId);
    });
  }

  fetchTicket(ticketId: number) {
    // Use the TicketService to fetch the ticket details
    this.ticketService.getTicketById(ticketId).subscribe(
      (response: any) => {
        this.ticket = response; // Assuming your API returns the ticket details
      },
      (error) => {
        console.error('Error fetching ticket:', error);
      }
    );
  }

  updateTicket() {
    this.ticket.lastModifiedDate = new Date();
    // Update the existing ticket
    this.ticketService.updateTicket(this.ticket.id, this.ticket).subscribe(
      (updatedTicket: any) => {
        console.log('Ticket updated successfully:', updatedTicket);
        setTimeout(() => {
          this.router.navigate(['/dashboard/viewalltickets']);
        }, 500); 
        // Handle success, e.g., show a success message or navigate to another page
      },
      (error) => {
        console.error('Error updating ticket:', error);
        // Handle error, e.g., show an error message
      }
    );
  }
}
