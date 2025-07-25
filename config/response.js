
var success_msg={
    registered:"profile registered successfuly",
    logIn:"logged in successfully",
    suggestion:"suggestion sent to the provider",
    deletetion:"product dropped from cart",
    address:"address added successfully",
    orderPlaced:"order placed successfully",
    order_Histoy:"order history fetched successfully",
    nearByProviderFound:"provider found",
    passwordLink:"password reset link sent to you registered email",
    addressHistory:"all addresses added are here",
    proAddedToCart:"product added to cart successfully",
    linkSent:"link sent successfully"
};

 var failed_msg={
    passNotMatched:"confirm password doesnt match with new password"
};

 var error_msg={
    registeration_err:"error registering the user",
    login_err:"error logging in the user",
    suggestion_err:"unable sending the suggestion",
    deletion_err:"can not delete the item from cart",
    address_err:"error adding the address",
    addressFetch_err:"error fetching all address",
    order_err:"err!!! no order placed",
    orderHistoy_err:"unable to fetch order history",
    provider_err:"error finding the provider",
    chnagePassword_err:"couldnt reset the password",
    linkExpired:"link got expired",
    addToCart_err:"error adding item to cart",
    placeOrder_err:"error placing order",
    forgotPass_err:"error while sending the reset link",
    resetPass_err:"error while rendering"
    
 }
 module.exports={
    success_msg:success_msg,
    failed_msg:failed_msg,
    error_msg:error_msg
 }