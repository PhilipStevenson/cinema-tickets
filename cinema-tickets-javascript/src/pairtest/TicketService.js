import TicketTypeRequest from './lib/TicketTypeRequest.js';
import InvalidPurchaseException from './lib/InvalidPurchaseException.js';

export default class TicketService {
  /**
   * Should only have private methods other than the one below.
   */

  purchaseTickets(accountId, ...ticketTypeRequests) {

    return this.#validateAccountId(accountId) ? true : false;
    
    // throw InvalidPurchaseException
  }

  #validateAccountId(accountId) {
    return typeof accountId == "number" && accountId > 0 ? true : false;
  }
}
