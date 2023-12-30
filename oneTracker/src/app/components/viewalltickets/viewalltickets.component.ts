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
    private router:Router
  ) {}

  ngOnInit(): void {
    this.ticketService.getTickets().subscribe((tickets) => {
      this.openTickets = tickets;
      this.filterService.getFilter().subscribe((filter) => {
        this.filterTickets(filter);
        this.paginate(); // Call paginate after fetching tickets
      });
    });
  }

  filterTickets(filter: string): void {
    this.filteredTickets = this.openTickets.filter((ticket) =>
      ticket.customer.toLowerCase().includes(filter.toLowerCase())
    );
    this.paginate(); // Call paginate after fetching tickets
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
