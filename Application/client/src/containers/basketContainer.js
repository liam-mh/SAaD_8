//Example of needed basket calls.
const checkoutBasket = async () => {
  try {
    const memberID = 14; // Im guessing we would already have this data due to login.

    const memberSubscription = await memberSubscriptionFrontEndService.get(
      "/readRecords",
      { MemberID: memberID },
      true
    );
    const currentTokens = memberSubscription.data[0].RemainingTokens;

    // This makes the initial record.
    // Delete if timer runs out, clear basket and exit to a different page?
    // For single media rental use "/createRecord as the path and an object with the fields defined like:
    //{
    //   MediaID: 1,
    //   MemberID: 14,
    //   BranchID: 1,
    //   Active: 0,
    //   RentStart: moment().format("YYYY-MM-DD"),
    //   RentEnd: moment().add(7, "days").format("YYYY-MM-DD")
    // }
    // For Multiple see below:
    const transactionCreated = await mediaHistoryFrontEndService.post(
      "/createRecords",
      [
        {
          MediaID: 1,
          MemberID: memberID,
          BranchID: 1,
          Active: 0,
          RentStart: moment().format("YYYY-MM-DD"),
          RentEnd: moment().add(7, "days").format("YYYY-MM-DD"),
        },
        {
          MediaID: 2,
          MemberID: 14,
          BranchID: 1,
          Active: 0,
          RentStart: moment().format("YYYY-MM-DD"),
          RentEnd: moment().add(7, "days").format("YYYY-MM-DD"),
        },
      ]
    );

    //Then update the members account we dont want to charge unless the media is rented.
    if (transactionCreated.status === 201) {
      //This could either be something you save in state or you could do some maths with the start and end dates of returned objects.
      const spentTokens = 2;
      const remainingTokens = currentTokens - spentTokens;
      try {
        const chargeCustomer = await memberSubscriptionFrontEndService.put(
          "/updateRecord",
          {
            MemberID: transactionCreated.data[0].MemberID,
            RemainingTokens: remainingTokens,
          }
        );
      } catch (error) {
        console.error("Error charging customer", error);
      }
      //Just put in loop becau

      const deleted = await mediaHistoryFrontEndService.delete(
        "/deleteRecord",
        { HistoryID: 96 }
      ); //Get on creation from transactionCreated.
    } else {
      console.error("No data added to rental history");
    }
  } catch (error) {
    console.log("FAIL", error);
  }
};
