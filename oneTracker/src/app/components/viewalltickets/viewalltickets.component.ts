// viewalltickets.component.ts
import { Component, OnInit } from '@angular/core';
import { FilterService } from '../../services/filter.service';
import { TicketService } from '../../services/ticket.service';

@Component({
  selector: 'app-viewalltickets',
  templateUrl: './viewalltickets.component.html',
  styleUrls: ['./viewalltickets.component.scss'],
})
export class ViewallticketsComponent implements OnInit {
  openTickets: any[] = [];
  filteredTickets: any[] = [];

  displayedColumns: string[] = [
    'id',
    'department',
    'category',
    'subCategory',
    'status',
    'customer',
    'issueTime',
    'age',
    'lastModifiedDate',
    'rootCauseAnalysis',
    'updateStatus', // New column for updating status
  ];

  constructor(
    private filterService: FilterService,
    private ticketService: TicketService
  ) {}

  ngOnInit(): void {
    this.ticketService.getTickets().subscribe((tickets) => {
      this.openTickets = tickets;
      this.filterService.getFilter().subscribe((filter) => {
        this.filterTickets(filter);
      });
    });
  }

  filterTickets(filter: string): void {
    this.filteredTickets = this.openTickets.filter((ticket) =>
      ticket.customer.toLowerCase().includes(filter.toLowerCase())
    );
  }

  // New method to update ticket status
  updateTicketStatus(ticketId: number, newStatus: string): void {
    const ticketToUpdate = this.openTickets.find((ticket) => ticket.id === ticketId);

    if (ticketToUpdate) {
      ticketToUpdate.status = newStatus;

      this.ticketService.updateTicket(ticketId, ticketToUpdate).subscribe(
        (updatedTicket) => {
          // Update successful, you can handle it as needed
          console.log('Ticket status updated successfully:', updatedTicket);
        },
        (error) => {
          // Handle the error if the update fails
          console.error('Error updating ticket status:', error);
        }
      );
    }
  }
}
