import { Component, OnInit, ViewChild } from '@angular/core';
import { FilterService } from '../../services/filter.service';
import { TicketService } from '../../services/ticket.service';
import { Router } from '@angular/router';
import { MatTableDataSource } from '@angular/material/table';
import { MatPaginator } from '@angular/material/paginator';
import { MatSort } from '@angular/material/sort';

@Component({
  selector: 'app-viewalltickets',
  templateUrl: './viewalltickets.component.html',
  styleUrls: ['./viewalltickets.component.scss'],
})
export class ViewallticketsComponent implements OnInit {
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
  ];

  displayedTickets = new MatTableDataSource<any>([]);
  itemsPerPage = 5;
  currentPage = 1;

  @ViewChild(MatPaginator) paginator!: MatPaginator;
  @ViewChild(MatSort) sort!: MatSort;

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
      this.displayedTickets = new MatTableDataSource(tickets.filter(
        (ticket) => ticket.status.toLowerCase() === 'open'
      ));
      this.displayedTickets.paginator = this.paginator;
      this.displayedTickets.sort = this.sort;
      this.updateTicketAges();
      this.updateDatabase();
      this.filterTickets(''); // Apply initial filtering
    });
  }

  updateDatabase(): void {
    this.displayedTickets.data.forEach((ticket) => {
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

    this.displayedTickets.data.forEach((ticket) => {
      const issueTime = new Date(ticket.issueTime);
      const ageInHours = Math.floor((currentTime.getTime() - issueTime.getTime()) / (1000 * 60 * 60));
      ticket.age = ageInHours;
    });
  }

  filterTickets(filter: string): void {
    this.currentPage = 1; // Reset current page when filtering
    this.displayedTickets.filter = filter.trim().toLowerCase();
    if (this.displayedTickets.paginator) {
      this.displayedTickets.paginator.firstPage();
    }
  }
  
  addRca(ticketId: number, event: Event) {
    event.stopPropagation();
    console.log('Hey');
  }

  editTicket(ticketId: number): void {
    this.router.navigate(['/dashboard', 'editticket', ticketId]);
  }
}
