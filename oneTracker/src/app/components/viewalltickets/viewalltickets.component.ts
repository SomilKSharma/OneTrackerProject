import { Component } from '@angular/core';

@Component({
  selector: 'app-viewalltickets',
  templateUrl: './viewalltickets.component.html',
  styleUrl: './viewalltickets.component.scss'
})
export class ViewallticketsComponent {
  openTickets = [
    {
      id: 1,
      department: 'IT',
      category: 'Software',
      subCategory: 'Bug',
      status: 'Open',
      customer: 'John Doe',
      issueTime: new Date('2023-01-01T10:30:00'),
      age: 5, // in days
      lastModifiedDate: new Date('2023-01-05T15:45:00'),
      rootCauseAnalysis: 'Pending',
    },
    {
      id: 2,
      department: 'HR',
      category: 'Employee Relations',
      subCategory: 'Conflict Resolution',
      status: 'In Progress',
      customer: 'Jane Smith',
      issueTime: new Date('2023-01-02T08:45:00'),
      age: 3, // in days
      lastModifiedDate: new Date('2023-01-05T11:20:00'),
      rootCauseAnalysis: 'Completed',
    },
    // Add more dummy tickets as needed
  ];

  // Filtered tickets to be displayed in the table
  filteredTickets = this.openTickets;

  // Define the columns to display in the table
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
}
