// data.component.ts
import { Component, OnInit } from '@angular/core';
import { ChartType } from 'chart.js';
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
  ticketsLast7Days: any[] = [];
  ticketsPerDay: { [key: string]: number } = {};
  // Line chart properties
  ticketsPerDayLabels: string[] = [];
  ticketsPerDayValues: number[] = [];
  lineChartOptions: any = {
    responsive: true,
    scales: {
      y: {
        beginAtZero: true,
        precision: 0,
        ticks: {
          stepSize: 1, // This ensures only integers are displayed
        },
      },
    },
  };
  
  lineChartLegend = false;
  lineChartType:ChartType = 'bar';


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
      this.ticketsLast7Days = this.filterTicketsLast7Days(tickets);
      this.ticketsPerDay = this.calculateTicketsPerDay(this.ticketsLast7Days);
      console.log(this.ticketsPerDay);
      // Extract labels and values for the line chart
      this.ticketsPerDayLabels = Object.keys(this.ticketsPerDay);
      this.ticketsPerDayValues = Object.values(this.ticketsPerDay);
    });
  }

  private isClosedIn4Hrs(ticket: any): boolean {
    return ticket.status.toLowerCase() === 'closed' && ticket.age <= 4;
  }

  private isClosedAfter4Hrs(ticket: any): boolean {
    return ticket.status.toLowerCase() === 'closed' && ticket.age > 4;
  }

  private calculateTicketsPerDay(tickets: any[]): { [key: string]: number } {
    const ticketsPerDay: { [key: string]: number } = {};

    tickets.forEach((ticket) => {
      const issueDate = new Date(ticket.issueTime).toLocaleDateString();
      ticketsPerDay[issueDate] = (ticketsPerDay[issueDate] || 0) + 1;
    });

    return ticketsPerDay;
  }

  private filterTicketsLast7Days(tickets: any[]): any[] {
    const sevenDaysAgo = new Date();
    sevenDaysAgo.setDate(sevenDaysAgo.getDate() - 7);

    return tickets.filter((ticket) => new Date(ticket.issueTime) >= sevenDaysAgo);
  }
}
