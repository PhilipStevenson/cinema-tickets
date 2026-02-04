import TicketService from "../src/pairtest/TicketService.js";
import TicketTypeRequest from "../src/pairtest/lib/TicketTypeRequest.js";

describe("purchaseTickets method", () => {
  const ticketService = new TicketService();

  test(`valid scenario (accountId = 1, ticketTypeRequest = new TicketTypeRequest('ADULT', 1))`, () => {
    const accountId = 1;
    const ticketTypeRequests = new TicketTypeRequest("ADULT", 1);

    expect(ticketService.purchaseTickets(accountId, ticketTypeRequests)).toBe(
      `Resevation successful, total number of chargeable seats: 1, total cost of chargeable seats: £25`,
    );
  });

  test(`valid scenario (accountId = 2, ticketTypeRequest = new TicketTypeRequest('ADULT', 2))`, () => {
    const accountId = 2;
    const ticketTypeRequests = new TicketTypeRequest("ADULT", 2);

    expect(ticketService.purchaseTickets(accountId, ticketTypeRequests)).toBe(
      `Resevation successful, total number of chargeable seats: 2, total cost of chargeable seats: £50`,
    );
  });

  test(`invalid scenario (accountId = 0, ticketTypeRequest = new TicketTypeRequest('ADULT', 1))`, () => {
    const accountId = 0;
    const ticketTypeRequests = new TicketTypeRequest("ADULT", 1);

    expect(() =>
      ticketService.purchaseTickets(accountId, ticketTypeRequests),
    ).toThrow(TypeError);
  });
});
