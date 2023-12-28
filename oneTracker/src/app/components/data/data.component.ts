import { Component } from '@angular/core';

@Component({
  selector: 'app-data',
  templateUrl: './data.component.html',
  styleUrls: ['./data.component.scss']
})
export class DataComponent {
  // Dummy data for rectangular tickets
  totalTickets: number = 100;
  openTickets: number = 25;
  ticketsClosedIn4Hrs: number = 40;
  ticketsClosedAfter4Hrs: number = 35;

  // Dummy data for the table
  dataSource: any[] = [
    { ticketNumber: 1, monday: 10, tuesday: 15, wednesday: 20, thursday: 18, friday: 25 },
    { ticketNumber: 2, monday: 8, tuesday: 12, wednesday: 15, thursday: 22, friday: 30 },
    // Add more rows as needed
  ];

  displayedColumns: string[] = ['ticketNumber', 'monday', 'tuesday', 'wednesday', 'thursday', 'friday'];

  constructor() {
    // Add any additional initialization logic here
  }
}
