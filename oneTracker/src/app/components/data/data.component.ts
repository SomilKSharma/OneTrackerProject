// data.component.ts
import { Component, OnInit } from '@angular/core';
import { TicketService } from '../../services/ticket.service';

@Component({
  selector: 'app-data',
  templateUrl: './data.component.html',
  styleUrls: ['./data.component.scss'],
})
export class DataComponent implements OnInit {
  totalTickets: number = 0;
  openTickets: number = 0;
  closedIn4Hrs: number = 0;
  closedAfter4Hrs: number = 0;

  constructor(private ticketService: TicketService) {}

  ngOnInit(): void {
    this.fetchTicketData();
  }

  fetchTicketData(): void {
    this.ticketService.getTickets().subscribe((tickets) => {
      this.totalTickets = tickets.length;
      this.openTickets = tickets.filter((ticket) => ticket.status.toLowerCase() === 'open').length;
      this.closedIn4Hrs = tickets.filter((ticket) => this.isClosedIn4Hrs(ticket)).length;
      this.closedAfter4Hrs = tickets.filter((ticket) => this.isClosedAfter4Hrs(ticket)).length;
    });
  }

  private isClosedIn4Hrs(ticket: any): boolean {
    return ticket.status.toLowerCase() === 'closed' && ticket.age <= 4;
  }

  private isClosedAfter4Hrs(ticket: any): boolean {
    return ticket.status.toLowerCase() === 'closed' && ticket.age > 4;
  }
}
