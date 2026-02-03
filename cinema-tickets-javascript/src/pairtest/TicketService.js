import TicketTypeRequest from './lib/TicketTypeRequest.js';
import InvalidPurchaseException from './lib/InvalidPurchaseException.js';

export default class TicketService {
  /**
   * Should only have private methods other than the one below.
   */

  purchaseTickets(accountId, ...ticketTypeRequests) {

    console.log(accountId)
    console.log(ticketTypeRequests)

    if (
      this.#validateAccountId(accountId) == true &&
      this.#validateTicketTypeRequests(ticketTypeRequests) == true
    ) {
      return true
    } else {
      return false
    }
    
    // throw InvalidPurchaseException
  }

  // Validate account id is of type number and more than zero.
  #validateAccountId(accountId) {
    return typeof accountId == "number" && accountId > 0 ? true : false;
  }

  // Validate ticket type requests.
  #validateTicketTypeRequests(ticketTypeRequests) {
    return ticketTypeRequests.every(
      (request) => this.#validateTicketTypeRequestType(request)
    ) ? true : false;
  }

  // Validate ticket type request is instance of TicketTypeRequest class.
  #validateTicketTypeRequestType(ticketTypeRequest) {
    return ticketTypeRequest instanceof TicketTypeRequest ? true : false;
  }
}
