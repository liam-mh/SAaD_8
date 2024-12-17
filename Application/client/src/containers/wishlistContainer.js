const wishlistFrontEndService = require("../services/storefront/wishlistFrontEndSevice");
const mediaHistoryFrontEndService = require("../services/storefront/mediaHistoryFrontEndService")
//You have the media displayed. 
//You have all relevant media data (Title and Type) via '/readRecords' route.
//You have all relevant member data... prompt login on wishlist button click if user not logged in.

const addToWishlist = async () => {

    //UC-005: add to wishlist.
    //Before creating pull members current wishlist items and group to avoid duplication.
    const wishlistItems = await wishlistFrontEndService.get(
        '/readRecords', {
            MemberID: 14,
            Title: 'The Hobbit',
            Type: 'Book' });

    //If it is already in their wishlist abort and display an alert of some sort.


    //add to wishlist
    const createdWishlistItem = await wishlistFrontEndService.post(
        '/creatRecord', {
            MemberID: 14,
            Title: 'The Hobbit',
            Type: 'Book',
            DateTime: moment().format('YYYY-MM-DD'),
            WishType: 'wishlist'
        });

    // Display some sort of confirmation that the item has been added to the wishlist and remain on the medias page.

    // Create a wishlist page or component and a way for the user to navigate to it.

    const memberID = 14;
    //Display their wishlist items:
    const newWishlistItems = await wishlistFrontEndService.get('/readRecords', {MemberId: memberID});

    //Use WishlistID retrieved on initial call
    const wishlistID = 1;
    //Delete Button:
    const deleteWishlistItem = await wishlistFrontEndService.delete('/deleteRecord', {WishlistID: wishlistID});
    //Reserve button: only if not available, button disabled if it is:
    const reserveWishlistItem = await wishlistFrontEndService.put('/updateRecord', {WishlistID: wishlistID, WishType: 'Reservation'});
    //Rent button: only if available, button disabled if it isn't:
    //Add to basket

    //WE WILL NEED TO HAVE A SECTION FOR RETURNING ON ACCOUNT PAGE FOR UC-006: NOTIFICATION FROM WISHLIST.
    //SIMPLE RETURN BUTTON ON AFTER A SEARCH BY MEDIAID UPDATES THE MEDIA ITEMS AVAILABILITY AND ACTUAL RETURN.
    const historyID = 20;
    const returnMedia = await mediaHistoryFrontEndService.put(
        '/updateRecord',
         {
            HistoryID: historyID,
            Active: 1,
            ActualReturn: moment().format('YYYY-MM-DD')
         });

    //The function that calls this will on success do a read on wishlist table.
    //Return the first reservations of the media with the lowest date and email them.
    //Then if nothing returned the first wishlist with the lowest date and email them.
    //I will implement this as a derived function.

    //UC-007: REQUEST MEDIA

    //Create a button to request media:
    //Display a form component with the relevent fields.
    //Do a read for the media grouping on title and type.
    //If it is there display an alert and send them back to wishlist.
    //Othewise create a new media request record.
    //Use notification system to send them an email

}
