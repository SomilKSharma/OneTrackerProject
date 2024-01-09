import { ComponentFixture, TestBed } from '@angular/core/testing';
import { ViewallticketsComponent } from './viewalltickets.component';
import { FilterService } from '../../services/filter.service';
import { TicketService } from '../../services/ticket.service';
import { Router } from '@angular/router';
import { MatPaginatorModule } from '@angular/material/paginator';
import { MatSortModule } from '@angular/material/sort';

describe('ViewallticketsComponent', () => {
  let component: ViewallticketsComponent;
  let fixture: ComponentFixture<ViewallticketsComponent>;
  let mockFilterService: jasmine.SpyObj<FilterService>;
  let mockTicketService: jasmine.SpyObj<TicketService>;
  let mockRouter: jasmine.SpyObj<Router>;

  beforeEach(() => {
    mockFilterService = jasmine.createSpyObj('FilterService', ['getFilter']);
    mockTicketService = jasmine.createSpyObj('TicketService', [
      'getTickets',
      'updateTicket',
    ]);
    mockRouter = jasmine.createSpyObj('Router', ['navigate']);

    TestBed.configureTestingModule({
      declarations: [ViewallticketsComponent],
      imports: [MatPaginatorModule, MatSortModule],
      providers: [
        { provide: FilterService, useValue: mockFilterService },
        { provide: TicketService, useValue: mockTicketService },
        { provide: Router, useValue: mockRouter },
      ],
    });

    fixture = TestBed.createComponent(ViewallticketsComponent);
    component = fixture.componentInstance;
  });

  it('should format date correctly', () => {
    const inputDate = '2024-01-05T00:00:00.000Z';
    const formattedDate = component.formatDate(inputDate);

    // Assuming the inputDate is '2024-01-05', the expected output should be '01/05/2024'
    expect(formattedDate).toBe('01/05/2024');
  });
});
