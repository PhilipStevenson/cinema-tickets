import ValidationService from "./ValidationService.js";

export default class TicketService {
  /**
   * Should only have private methods other than the one below.
   */

  purchaseTickets(accountId, ...ticketTypeRequests) {
    console.log(accountId);
    console.log(ticketTypeRequests);

    const validationService = new ValidationService();

    if (
      validationService.validateAccountId(accountId) == true &&
      validationService.validateTicketTypeRequestType(ticketTypeRequests) ==
        true &&
      validationService.validateNumberOfTicketsRequested(
        ticketTypeRequests,
        25,
      ) == true
    ) {
      return true;
    } else {
      return false;
      // throw InvalidPurchaseException
    }
  }

  // Get number of chargeable seats.
  #getNumberOfChargeableSeats(ticketTypeRequests) {
    const initialValue = 0;
    const totalNumberOfChargeableSeats = ticketTypeRequests.reduce(
      (accumulator, currentValue) => {
        if (currentValue.getNoOfTickets() != "INFANT") {
          accumulator + currentValue.getNoOfTickets();
        }
      },
      initialValue,
    );

    return totalNumberOfChargeableSeats;
  }

  // Get total cost of chargeable seats.
  #getTotalCostOfChargeableSeats(ticketTypeRequests) {
    const initialValue = 0;
    const totalCostOfChargeableSeats = ticketTypeRequests.reduce(
      (accumulator, currentValue) => {
        if (currentValue.getTicketType() == "CHILD") {
          accumulator + currentValue.getNoOfTickets() * 15;
        } else if (currentValue.getTicketType() == "ADULT") {
          accumulator + currentValue.getNoOfTickets() * 25;
        }
      },
      initialValue,
    );

    return totalCostOfChargeableSeats;
  }
}
