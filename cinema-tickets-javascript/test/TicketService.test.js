import TicketService from '../src/pairtest/TicketService.js';
import TicketTypeRequest from '../src/pairtest/lib/TicketTypeRequest.js';

describe('Test TicketService class', () => {
  const ticketService = new TicketService();

  test('purchaseTickets valid account id (1) and single adult ticket', () => {
    const accountId = 1
    const ticketTypeRequest = new TicketTypeRequest('ADULT', 1)

    expect(
      ticketService.purchaseTickets(
        accountId,
        ticketTypeRequest
      )
    ).toBe(true);
  })

  test('purchaseTickets invalid account id (0)', () => {
    const accountId = 0

    expect(
      ticketService.purchaseTickets(accountId)
    ).toBe(false);
  })

  test('purchaseTickets invalid account id ("foo")', () => {
    const accountId = "foo"

    expect(
      ticketService.purchaseTickets(accountId)
    ).toBe(false);
  })
})
