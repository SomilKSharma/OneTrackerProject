import { TestBed, inject } from '@angular/core/testing';
import {
  HttpClientTestingModule,
  HttpTestingController,
} from '@angular/common/http/testing';
import { TicketService } from './ticket.service';

describe('TicketService', () => {
  let service: TicketService;
  let httpTestingController: HttpTestingController;

  beforeEach(() => {
    TestBed.configureTestingModule({
      imports: [HttpClientTestingModule],
      providers: [TicketService],
    });

    service = TestBed.inject(TicketService);
    httpTestingController = TestBed.inject(HttpTestingController);
  });

  afterEach(() => {
    httpTestingController.verify();
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });

  it('should retrieve all tickets', () => {
    const dummyTickets = [{ id: 1, title: 'Test Ticket' }];

    service.getTickets().subscribe((tickets) => {
      expect(tickets).toEqual(dummyTickets);
    });

    const req = httpTestingController.expectOne(
      'http://localhost:3000/api/tickets'
    );
    expect(req.request.method).toBe('GET');
    req.flush(dummyTickets);
  });

  it('should retrieve a ticket by ID', () => {
    const dummyTicket = { id: 1, title: 'Test Ticket' };
    const ticketId = 1;

    service.getTicketById(ticketId).subscribe((ticket) => {
      expect(ticket).toEqual(dummyTicket);
    });

    const req = httpTestingController.expectOne(
      `http://localhost:3000/api/tickets/${ticketId}`
    );
    expect(req.request.method).toBe('GET');
    req.flush(dummyTicket);
  });

  it('should create a new ticket', () => {
    const dummyTicketData = { title: 'New Ticket' };

    service.createTicket(dummyTicketData).subscribe((ticket) => {
      expect(ticket).toEqual(dummyTicketData);
    });

    const req = httpTestingController.expectOne(
      'http://localhost:3000/api/tickets'
    );
    expect(req.request.method).toBe('POST');
    req.flush(dummyTicketData);
  });

  it('should update an existing ticket', () => {
    const dummyUpdatedData = { title: 'Updated Ticket' };
    const ticketId = 1;

    service.updateTicket(ticketId, dummyUpdatedData).subscribe((ticket) => {
      expect(ticket).toEqual(dummyUpdatedData);
    });

    const req = httpTestingController.expectOne(
      `http://localhost:3000/api/tickets/${ticketId}`
    );
    expect(req.request.method).toBe('PUT');
    req.flush(dummyUpdatedData);
  });
});
