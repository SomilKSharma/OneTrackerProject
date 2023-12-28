import { Component, OnInit } from '@angular/core';
import { FilterService } from '../../services/filter.service';

@Component({
  selector: 'app-viewalltickets',
  templateUrl: './viewalltickets.component.html',
  styleUrls: ['./viewalltickets.component.scss'] 
})
export class ViewallticketsComponent implements OnInit {
  openTickets = [
    {
      id: 1,
      department: 'IT',
      category: 'Software',
      subCategory: 'Bug',
      status: 'Open',
      customer: 'John Doe',
      issueTime: new Date('2023-01-01T10:30:00'),
      age: 5, 
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
      age: 3, 
      lastModifiedDate: new Date('2023-01-05T11:20:00'),
      rootCauseAnalysis: 'Completed',
    },
    
  ];

  
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
  ];

  constructor(private filterService: FilterService) {}

  ngOnInit(): void {
    this.filterService.getFilter().subscribe((filter) => {
      this.filterTickets(filter);
    });
  }

  filterTickets(filter: string): void {
    
    this.filteredTickets = this.openTickets.filter((ticket) =>
      ticket.customer.toLowerCase().includes(filter.toLowerCase())
    );
  }
}
