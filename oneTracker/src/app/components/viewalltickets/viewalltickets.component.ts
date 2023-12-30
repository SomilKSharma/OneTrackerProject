// viewalltickets.component.ts
import { Component, OnInit } from '@angular/core';
import { FilterService } from '../../services/filter.service';
import { TicketService } from '../../services/ticket.service';
import { Router } from '@angular/router';

@Component({
  selector: 'app-viewalltickets',
  templateUrl: './viewalltickets.component.html',
  styleUrls: ['./viewalltickets.component.scss'],
})
export class ViewallticketsComponent implements OnInit {
  openTickets: any[] = [];
  filteredTickets: any[] = [];
  displayedTickets: any[] = [];
  itemsPerPage = 5;
  currentPage = 1;

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
    private ticketService: TicketService,
    private router: Router
  ) {}

  ngOnInit(): void {
    this.fetchOpenTickets();
    this.filterService.getFilter().subscribe((filter) => {
      this.filterTickets(filter);
    });
  }

  fetchOpenTickets(): void {
    this.ticketService.getTickets().subscribe((tickets) => {
      this.openTickets = tickets.filter((ticket) => ticket.status.toLowerCase() === 'open');
      this.updateTicketAges();
      this.updateDatabase();
      this.filterTickets(''); // Apply initial filtering
    });
  }

  updateDatabase(): void {
    this.openTickets.forEach((ticket) => {
      const updatedData = { ...ticket, id: ticket.id };
      this.ticketService.updateTicket(ticket.id, updatedData).subscribe(
        (response) => {
          console.log(`Ticket ${ticket.id} updated successfully`);
        },
        (error) => {
          console.error(`Error updating ticket ${ticket.id}:`, error);
        }
      );
    });
  }

  updateTicketAges(): void {
    const currentTime = new Date();

    this.openTickets.forEach((ticket) => {
      const issueTime = new Date(ticket.issueTime);
      const ageInDays = Math.floor((currentTime.getTime() - issueTime.getTime()) / (1000 * 60 * 60 * 24));
      ticket.age = ageInDays;
    });
  }

  filterTickets(filter: string): void {
    this.currentPage = 1; // Reset current page when filtering
    this.filteredTickets = this.openTickets.filter(
      (ticket) =>
        ticket.customer.toLowerCase().includes(filter.toLowerCase())
    );
    this.paginate();
  }

  paginate(): void {
    const startIndex = (this.currentPage - 1) * this.itemsPerPage;
    const endIndex = startIndex + this.itemsPerPage;
    this.displayedTickets = this.filteredTickets.slice(startIndex, endIndex);
  }

  setPage(pageNumber: number): void {
    this.currentPage = pageNumber;
    this.paginate();
  }

  getPages(): number[] {
    const pageCount = Math.ceil(this.filteredTickets.length / this.itemsPerPage);
    return new Array(pageCount).fill(0).map((_, index) => index + 1);
  }

  editTicket(ticketId: number) {
    this.router.navigate(['/dashboard', 'editticket', ticketId]);
  }
}
