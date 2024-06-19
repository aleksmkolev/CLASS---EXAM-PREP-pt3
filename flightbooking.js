class FlightBookingSystem {
  constructor(agencyName) {
    //The constructor has 4 properties:
    //agencyName - a string
    //flights - an empty array
    //bookings - an empty array
    //bookingsCount – 0
    //At the initialization of the FlightBookingSystem class, the constructor accepts only the agencyName!

    this.agencyName = agencyName;
    this.flights = [];
    this.bookings = [];
    this.bookingsCount = 0;
  }

  addFlight(flightNumber, destination, departureTime, price) {
    //addFlight (flightNumber, destination, departureTime, price)
    //This method adds a new flight to the system. It accepts 4 arguments:
    //flightNumber - a unique string identifier for the flight.
    //destination - a string representing the flight's destination.
    //departureTime - a string representing the departure time.
    //price - a number representing the ticket price.
    //If a flight with the same flight number already exists in the flights array, return the following message:
    //`Flight ${flightNumber} to ${destination} is already available.`
    //Otherwise, add the new flight to the flights array as an object and return the following message:
    //`Flight ${flightNumber} to ${destination} has been added to the system.`

    const existingFlight = this.flights.find(
      (flight) => flight.flightNumber === flightNumber
    );
    if (existingFlight) {
      return `Flight ${flightNumber} to ${destination} is already available.`;
    }

    this.flights.push({ flightNumber, destination, departureTime, price });
    return `Flight ${flightNumber} to ${destination} has been added to the system.`;
  }

  bookFlight(passengerName, flightNumber) {
    //bookFlight (passengerName, flightNumber)
    //This method allows a passenger to book a flight. It accepts 2 arguments:
    //passengerName - a string representing the name of the passenger.
    //flightNumber - a string representing the flight number for booking.
    //If the flight with the specified flight number is not found in the flights array, return the following message:
    //`Flight ${flightNumber} is not available for booking.`
    //Otherwise, add the booking to the bookings array as an object and increment bookingsCount by 1. Return the following message:
    //`Booking for passenger ${passengerName} on flight ${flightNumber} is confirmed.`

    const flight = this.flights.find(
      (flight) => flight.flightNumber === flightNumber
    );
    if (!flight) {
      return `Flight ${flightNumber} is not available for booking.`;
    }

    this.bookings.push({ passengerName, flightNumber });
    this.bookingsCount++;
    return `Booking for passenger ${passengerName} on flight ${flightNumber} is confirmed.`;
  }

  cancelBooking(passengerName, flightNumber) {
    //This method allows a passenger to cancel a flight booking. It accepts 2 arguments:
    //passengerName - a string representing the name of the passenger.
    //flightNumber - a string representing the flight number to cancel.
    //If the booking with the specified passenger name and flight number is not found in the bookings array, throw error with the following message:
    //`Booking for passenger ${passengerName} on flight ${flightNumber} not found.`
    //Otherwise, remove the booking from the bookings array, decrement bookingsCount by 1 and return the following message:
    //`Booking for passenger ${passengerName} on flight ${flightNumber} is cancelled.`

    const index = this.bookings.findIndex(
      (booking) =>
        booking.passengerName === passengerName &&
        booking.flightNumber === flightNumber
    );
    if (index === -1) {
      throw new Error(
        `Booking for passenger ${passengerName} on flight ${flightNumber} not found.`
      );
    }

    this.bookings.splice(index, 1);
    this.bookingsCount--;
    return `Booking for passenger ${passengerName} on flight ${flightNumber} is cancelled.`;
  }

  showBookings(criteria) {
    //Accept 1 argument:
    //criteria – a string representing the booking criteria ("all", "cheap", "expensive").
    //This method returns information based on the booking criteria:
    //If the bookings array is empty, throw error with the following message:
    //`No bookings have been made yet.`
    //If the criteria is "all", return a list of all bookings in the following format:
    //On first line show the following message:
    //`All bookings(${bookingsCount}):`
    //On the following lines, display information about each booking:
    //`${passengerName} booked for flight ${flightNumber}.`

    //If the criteria is "cheap":
    //If there are no "cheap" flights, return :
    //"No cheap bookings found."

    //Else, return a list of all bookings under or exactly the price of $100 in the following format:
    //On first line show the following message:
    //"Cheap bookings:"
    //On the following lines, display information about each booking:
    //`${passengerName} booked for flight ${flightNumber}.`
    //If the criteria is "expensive":
    //If there are no "expensive" flights, return :
    //"No expensive bookings found."

    //Else, return a list of all bookings over the price of $100 in the following format:
    //On first line show the following message:
    //"Expensive bookings:"
    //On the following lines, display information about each booking:
    //`${passengerName} booked for flight ${flightNumber}.`

    if (this.bookings.length === 0) {
      throw new Error(`No bookings have been made yet.`);
    }

    if (criteria === "all") {
      let result = `All bookings(${this.bookingsCount}):\n`;
      this.bookings.forEach((booking) => {
        result += `${booking.passengerName} booked for flight ${booking.flightNumber}.\n`;
      });
      return result;
    } else if (criteria === "cheap") {
      const cheapBookings = this.bookings.filter((booking) =>
        this.flights.find(
          (flight) =>
            flight.flightNumber === booking.flightNumber && flight.price <= 100
        )
      );
      if (cheapBookings.length === 0) {
        return "No cheap bookings found.";
      }
      let result = "Cheap bookings:\n";
      cheapBookings.forEach((booking) => {
        result += `${booking.passengerName} booked for flight ${booking.flightNumber}.\n`;
      });
      return result;
    } else if (criteria === "expensive") {
      const expensiveBookings = this.bookings.filter((booking) =>
        this.flights.find(
          (flight) =>
            flight.flightNumber === booking.flightNumber && flight.price > 100
        )
      );
      if (expensiveBookings.length === 0) {
        return "No expensive bookings found.";
      }
      let result = "Expensive bookings:\n";
      expensiveBookings.forEach((booking) => {
        result += `${booking.passengerName} booked for flight ${booking.flightNumber}.\n`;
      });
      return result.trim();
    }
  }
}

const system = new FlightBookingSystem("TravelWorld");
console.log(system.addFlight("AA101", "Los Angeles", "09:00 AM", 250));
console.log(system.addFlight("BB202", "New York", "10:30 AM", 180));
console.log(system.bookFlight("Alice", "AA101"));
console.log(system.bookFlight("Bob", "BB202"));
console.log(system.showBookings("expensive"));
console.log(system.showBookings("cheap"));
