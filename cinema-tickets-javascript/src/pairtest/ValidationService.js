import TicketTypeRequest from "./lib/TicketTypeRequest";

export default class ValidationService {
  // Validate account id is of type int and more than zero.
  validateAccountId(accountId) {
    if (Number.isInteger(accountId) && accountId > 0) {
      return true;
    } else {
      throw new TypeError("accountId must be an integer and more than 0");
    }
  }

  // Validate ticket type request is instance of TicketTypeRequest class.
  validateTicketTypeRequestType(ticketTypeRequests) {
    if (
      ticketTypeRequests.every(
        (request) => request instanceof TicketTypeRequest,
      )
    ) {
      return true;
    } else {
      throw new TypeError(
        "ticketTypeRequests must consist of type TicketTypeRequest",
      );
    }
  }

  // Validate total number of tickets requested is 25 max.
  validateNumberOfTicketsRequested(ticketTypeRequests, maxTickets) {
    const initialValue = 0;
    const totalNumberOfTicketsRequested = ticketTypeRequests.reduce(
      (accumulator, currentValue) =>
        accumulator + currentValue.getNoOfTickets(),
      initialValue,
    );

    if (totalNumberOfTicketsRequested <= maxTickets) {
      return true;
    } else {
      throw new Error(`number of requested tickets exceeds ${maxTickets}`);
    }
  }
}
