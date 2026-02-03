import TicketService from '../src/pairtest/TicketService.js';

describe('Test TicketService class', () => {
  const ticketService = new TicketService();

  test('purchaseTickets valid account id (1)', () => {
    expect(ticketService.purchaseTickets(1)).toBe(true);
  })

  test('purchaseTickets invalid account id (0)', () => {
    expect(ticketService.purchaseTickets(0)).toBe(false);
  })

  test('purchaseTickets invalid account id ("foo")', () => {
    expect(ticketService.purchaseTickets("foo")).toBe(false);
  })
})
