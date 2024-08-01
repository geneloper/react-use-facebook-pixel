export enum TrackableEventNameEnum {
  /**
   *  When payment information is added in the checkout flow.
   *
   * A person clicks on a save billing information button. */
  AddPaymentInfo = 'AddPaymentInfo',
  /** When a product is added to the shopping cart.
   *
   * A person clicks on an add to cart button. */
  AddToCart = 'AddToCart',
  /** When a product is added to a wishlist.
   *
   * A person clicks on an add to wishlist button. */
  AddToWishlist = 'AddToWishlist',
  /** When a registration form is completed.
   *
   * A person submits a completed subscription or signup form. */
  CompleteRegistration = 'CompleteRegistration',
  /** When a person initiates contact with your business via telephone, SMS, email, chat, etc.
   *
   * A person submits a question about a product. */
  Contact = 'Contact',
  /** When a person customizes a product.
   *
   * A person selects the color of a t-shirt. */
  CustomizeProduct = 'CustomizeProduct',
  /** When a person donates funds to your organization or cause.
   *
   * A person adds a donation to the Humane Society to their cart. */
  Donate = 'Donate',
  /** When a person searches for a location of your store via a website or app, with an intention to visit the physical location.
   *
   * A person wants to find a specific product in a local store. */
  FindLocation = 'FindLocation',
  /** When a person enters the checkout flow prior to completing the checkout flow.
   *
   * A person clicks on a checkout button. */
  InitiateCheckout = 'InitiateCheckout',
  /** When a sign up is completed.
   *
   * A person clicks on pricing. */
  Lead = 'Lead',
  /** When a purchase is made or checkout flow is completed.
   *
   * A person has finished the purchase or checkout flow and lands on thank you or confirmation page. */
  Purchase = 'Purchase',
  /** When a person books an appointment to visit one of your locations.
   *
   * A person selects a date and time for a tennis lesson. */
  Schedule = 'Schedule',
  /** When a search is made.
   *
   * A person searches for a product on your website.
   */
  Search = 'Search',
  /**
   * When a person starts a free trial of a product or service you offer.
   *
   * A person selects a free week of your game.
   */
  StartTrial = 'StartTrial',
  /**
   * When a person applies for a product, service, or program you offer.
   *
   * A person applies for a credit card, educational program, or job.
   */
  SubmitApplication = 'SubmitApplication',
  /**
   * When a person applies to a start a paid subscription for a product or service you offer.
   *
   * A person subscribes to your streaming service.
   */
  Subscribe = 'Subscribe',
  /**
   * A visit to a web page you care about (for example, a product page or landing page). ViewContent tells you if someone visits a web page's URL, but not what they see or do on that page.
   *
   * A person lands on a product details page.
   */
  ViewContent = 'ViewContent',
  /**
   * Initial point for tracking.
   */
  PageView = 'PageView',
}
