var success_msg = {
  registered: "Profile registered successfuly",
  logIn: "Logged in successfully",
  suggestion: "Suggestion sent to the provider",
  deletetion: "Product dropped from cart",
  address: "Address added successfully",
  orderPlaced: "Order placed successfully",
  order_Histoy: "Order history fetched successfully",
  nearByProviderFound: "Provider found",
  passwordLink: "Password reset link sent to you registered email",
  addressHistory: "All addresses added are here",
  proAddedToCart: "Product added to cart successfully",
  linkSent: "Link sent successfully",
};

var failed_msg = {
  passNotMatched: "Confirm password doesnt match with new password",
  noUSer: "No user found",
};

var error_msg = {
  registeration_err: "Error registering the user",
  login_err: "Error logging in the user",
  suggestion_err: "Unable sending the suggestion",
  deletion_err: "Can not delete the item from cart",
  address_err: "Error adding the address",
  addressFetch_err: "Error fetching all address",
  order_err: "Err!!! no order placed",
  orderHistoy_err: "Unable to fetch order history",
  provider_err: "Error finding the provider",
  chnagePassword_err: "Couldnt reset the password",
  linkExpired: "Link got expired",
  addToCart_err: "Error adding item to cart",
  placeOrder_err: "Error placing order",
  forgotPass_err: "Error while sending the reset link",
  resetPass_err: "Error while rendering",
};
module.exports = {
  success_msg: success_msg,
  failed_msg: failed_msg,
  error_msg: error_msg,
};
