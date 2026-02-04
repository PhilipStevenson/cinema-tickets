import ValidationService from "../src/pairtest/ValidationService.js";
import TicketTypeRequest from "../src/pairtest/lib/TicketTypeRequest.js";

const validationService = new ValidationService();

describe("validateAccountId method", () => {
  test("valid scenario (accountId = 1)", () => {
    const accountId = 1;

    expect(validationService.validateAccountId(accountId)).toBe(true);
  });

  test("invalid scenario (accountId = 0)", () => {
    const accountId = 0;

    expect(() => validationService.validateAccountId(accountId)).toThrow(
      TypeError,
    );
  });

  test('invalid scenario (accountId = "foo")', () => {
    const accountId = "foo";

    expect(() => validationService.validateAccountId(accountId)).toThrow(
      TypeError,
    );
  });
});

describe("validateTicketTypeRequestType method", () => {
  test(`valid scenario (ticketTypeRequests = [new TicketTypeRequest('ADULT', 1)])`, () => {
    const ticketTypeRequests = [new TicketTypeRequest("ADULT", 1)];

    expect(
      validationService.validateTicketTypeRequestType(ticketTypeRequests),
    ).toBe(true);
  });

  test(`valid scenario (ticketTypeRequests = [new TicketTypeRequest('ADULT', 1), new TicketTypeRequest('CHILD', 2)])`, () => {
    const ticketTypeRequests = [
      new TicketTypeRequest("ADULT", 1),
      new TicketTypeRequest("CHILD", 2),
    ];

    expect(
      validationService.validateTicketTypeRequestType(ticketTypeRequests),
    ).toBe(true);
  });

  test(`invalid scenario (ticketTypeRequests = ["foo"])`, () => {
    const ticketTypeRequests = ["foo"];

    expect(() =>
      validationService.validateTicketTypeRequestType(ticketTypeRequests),
    ).toThrow(TypeError);
  });
});

describe("validateNumberOfTicketsRequested method", () => {
  test(`valid scenario (ticketTypeRequests = [new TicketTypeRequest('ADULT', 1)], maxTickets = 1)`, () => {
    const ticketTypeRequests = [new TicketTypeRequest("ADULT", 1)];
    const maxTickets = 1;

    expect(
      validationService.validateNumberOfTicketsRequested(
        ticketTypeRequests,
        maxTickets,
      ),
    ).toBe(true);
  });

  test(`invalid scenario (ticketTypeRequests = [new TicketTypeRequest('ADULT', 1), new TicketTypeRequest('ADULT', 1)], maxTickets = 1)`, () => {
    const ticketTypeRequests = [
      new TicketTypeRequest("ADULT", 1),
      new TicketTypeRequest("ADULT", 1),
    ];
    const maxTickets = 1;

    expect(() =>
      validationService.validateNumberOfTicketsRequested(
        ticketTypeRequests,
        maxTickets,
      ),
    ).toThrow(Error);
  });

  test(`invalid scenario (ticketTypeRequests = [new TicketTypeRequest('ADULT', 50)], maxTickets = 49)`, () => {
    const ticketTypeRequests = [new TicketTypeRequest("ADULT", 50)];
    const maxTickets = 49;

    expect(() =>
      validationService.validateNumberOfTicketsRequested(
        ticketTypeRequests,
        maxTickets,
      ),
    ).toThrow(Error);
  });
});

describe("validateAdultPresent method", () => {
  test(`valid scenario (ticketTypeRequests = [new TicketTypeRequest('ADULT', 1)])`, () => {
    const ticketTypeRequests = [new TicketTypeRequest("ADULT", 1)];

    expect(validationService.validateAdultPresent(ticketTypeRequests)).toBe(
      true,
    );
  });

  test(`invalid scenario (ticketTypeRequests = [new TicketTypeRequest('CHILD', 1)])`, () => {
    const ticketTypeRequests = [new TicketTypeRequest("CHILD", 1)];

    expect(() =>
      validationService.validateAdultPresent(ticketTypeRequests),
    ).toThrow(Error);
  });

  test(`invalid scenario (ticketTypeRequests = [new TicketTypeRequest('INFANT', 1)])`, () => {
    const ticketTypeRequests = [new TicketTypeRequest("INFANT", 1)];

    expect(() =>
      validationService.validateAdultPresent(ticketTypeRequests),
    ).toThrow(Error);
  });
});
