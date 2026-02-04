import InvalidPurchaseException from "./lib/InvalidPurchaseException.js";
import SeatReservationService from "../thirdparty/seatbooking/SeatReservationService.js";
import TicketPaymentService from "../thirdparty/paymentgateway/TicketPaymentService.js";
import ValidationService from "./ValidationService.js";

export default class TicketService {
  /**
   * Should only have private methods other than the one below.
   */

  purchaseTickets(accountId, ...ticketTypeRequests) {
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
      const totalCostOfChargeableSeats =
        this.#getTotalCostOfChargeableSeats(ticketTypeRequests);
      const numberOfChargeableSeats =
        this.#getNumberOfChargeableSeats(ticketTypeRequests);

      const ticketPaymentService = new TicketPaymentService();

      try {
        ticketPaymentService.makePayment(accountId, totalCostOfChargeableSeats);
      } catch (error) {
        throw new InvalidPurchaseException(error);
      }

      const seatReservationService = new SeatReservationService();

      try {
        seatReservationService.reserveSeat(accountId, numberOfChargeableSeats);
      } catch (error) {
        throw new InvalidPurchaseException(error);
      }

      return `Resevation successful, total number of chargeable seats: ${numberOfChargeableSeats}, total cost of chargeable seats: £${totalCostOfChargeableSeats}`;
    } else {
      throw new InvalidPurchaseException(error);
    }
  }

  // Get number of chargeable seats.
  #getNumberOfChargeableSeats(ticketTypeRequests) {
    const initialValue = 0;
    const totalNumberOfChargeableSeats = ticketTypeRequests.reduce(
      (accumulator, currentValue) => {
        if (currentValue.getNoOfTickets() != "INFANT") {
          return accumulator + currentValue.getNoOfTickets();
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
          return accumulator + currentValue.getNoOfTickets() * 15;
        } else if (currentValue.getTicketType() == "ADULT") {
          return accumulator + currentValue.getNoOfTickets() * 25;
        }
      },
      initialValue,
    );

    return totalCostOfChargeableSeats;
  }
}
