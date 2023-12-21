import { Component } from '@angular/core';

@Component({
  selector: 'app-editticket',
  templateUrl: './editticket.component.html',
  styleUrl: './editticket.component.scss'
})
export class EditticketComponent {
  editing: boolean = true;
  ticket = {
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
  };
}
