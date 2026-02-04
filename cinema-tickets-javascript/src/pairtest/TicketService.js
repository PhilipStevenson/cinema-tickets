import ValidationService from './ValidationService.js';

export default class TicketService {
  /**
   * Should only have private methods other than the one below.
   */

  purchaseTickets(accountId, ...ticketTypeRequests) {

    console.log(accountId)
    console.log(ticketTypeRequests)

    const validationService = new ValidationService

    if (
      validationService.validateAccountId(accountId) == true &&
      validationService.validateTicketTypeRequestType(ticketTypeRequests) == true &&
      validationService.validateNumberOfTicketsRequested(ticketTypeRequests, 25) == true
    ) {
      return true;
    } else {
      return false;
      // throw InvalidPurchaseException
    }
  }
}
