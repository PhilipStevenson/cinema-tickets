import TicketTypeRequest from "./lib/TicketTypeRequest";

export default class ValidationService {

  // Validate account id is of type int and more than zero.
  validateAccountId(accountId) {
    if (Number.isInteger(accountId) && accountId > 0) {
      return true;
    } else {
      return false;
    }
  }

  // Validate ticket type request is instance of TicketTypeRequest class.
  validateTicketTypeRequestType(ticketTypeRequests) {
    return ticketTypeRequests.every(
      (request) => request instanceof TicketTypeRequest
    ) ? true : false;
  }

  // Validate total number of tickets requested is 25 max.
  validateNumberOfTicketsRequested(ticketTypeRequests, maxTickets) {
    const initialValue = 0;
    const totalNumberOfTicketsRequested = ticketTypeRequests.reduce(
      (accumulator, currentValue) => accumulator + currentValue.getNoOfTickets(),
      initialValue
    );
    
    return totalNumberOfTicketsRequested <= maxTickets ? true : false;
  }
}
