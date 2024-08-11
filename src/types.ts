interface ContentItem {
  id: string;
  quantity: number;
}

type ContentType = 'product' | 'product_group';

interface AddPaymentInfoData {
  /** Array of content IDs related to the event */
  content_ids?: string[];
  /** Array of content objects related to the event @type ContentItem[] */
  contents?: ContentItem[];
  /** Currency code (e.g., 'USD') */
  currency?: string;
  /** Value associated with the event */
  value?: number;
}

interface AddToCartData {
  /** Array of content IDs related to the event */
  content_ids?: string[];
  /** Type of content (e.g., 'product') @type ContentType*/
  content_type?: ContentType;
  /** Array of content objects related to the event @type ContentItem[] */
  contents?: ContentItem[];
  /** Currency code (e.g., 'USD') */
  currency?: string;
  /** Value associated with the event */
  value?: number;
}

interface AddToWishlistData {
  /** Array of content IDs related to the event */
  content_ids?: string[];
  /** Array of content objects related to the event @type ContentItem[] */
  contents?: ContentItem[];
  /** Currency code (e.g., 'USD') */
  currency?: string;
  /** Value associated with the event */
  value?: number;
}

interface CompleteRegistrationData {
  /** Currency code (e.g., 'USD') */
  currency?: string;
  /** Value associated with the event */
  value?: number;
}

interface ContactData {}

interface CustomizeProductData {}

interface DonateData {}

interface FindLocationData {}

interface InitiateCheckoutData {
  /** Array of content IDs related to the event */
  content_ids?: string[];
  /** Array of content objects related to the event @type ContentItem[] */
  contents?: ContentItem[];
  /** Currency code (e.g., 'USD') */
  currency?: string;
  /** Number of items involved in the event */
  num_items?: number;
  /** Value associated with the event */
  value?: number;
}

interface LeadData {
  /** Currency code (e.g., 'USD') */
  currency?: string;
  /** Value associated with the event */
  value?: number;
}

interface PurchaseData {
  /** Array of content IDs related to the event */
  content_ids?: string[];
  /** Type of content (e.g., 'product') @type ContentType */
  content_type?: ContentType;
  /** Array of content objects related to the event @type ContentItem[] */
  contents?: ContentItem[];
  /** Currency code (e.g., 'USD') */
  currency: string;
  /** Number of items involved in the event */
  num_items?: number;
  /** Value associated with the event */
  value: number;
}

interface ScheduleData {}

interface SearchData {
  /** Array of content IDs related to the event */
  content_ids?: string[];
  /** Type of content (e.g., 'product') @type ContentType */
  content_type?: ContentType;
  /** Array of content objects related to the event @type ContentItem[] */
  contents?: ContentItem[];
  /** Currency code (e.g., 'USD') */
  currency?: string;
  /** Search string entered by the user */
  search_string?: string;
  /** Value associated with the event */
  value?: number;
}

interface StartTrialData {
  /** Currency code (e.g., 'USD') */
  currency?: string;
  /** Predicted lifetime value of the trial */
  predicted_ltv?: number;
  /** Value associated with the event */
  value?: number;
}

interface SubmitApplicationData {}

interface SubscribeData {
  /** Currency code (e.g., 'USD') */
  currency?: string;
  /** Predicted lifetime value of the subscription */
  predicted_ltv?: number;
  /** Value associated with the event */
  value?: number;
}

interface ViewContentData {
  /** Array of content IDs related to the event */
  content_ids?: string[];
  /** Type of content (e.g., 'product') @type ContentType */
  content_type?: ContentType;
  /** Array of content objects related to the event @type ContentItem[] */
  contents?: ContentItem[];
  /** Currency code (e.g., 'USD') */
  currency?: string;
  /** Value associated with the event */
  value?: number;
}

interface PageViewData {}

type EventData = {
  AddPaymentInfo: AddPaymentInfoData;
  AddToCart: AddToCartData;
  AddToWishlist: AddToWishlistData;
  CompleteRegistration: CompleteRegistrationData;
  Contact: ContactData;
  CustomizeProduct: CustomizeProductData;
  Donate: DonateData;
  FindLocation: FindLocationData;
  InitiateCheckout: InitiateCheckoutData;
  Lead: LeadData;
  Purchase: PurchaseData;
  Schedule: ScheduleData;
  Search: SearchData;
  StartTrial: StartTrialData;
  SubmitApplication: SubmitApplicationData;
  Subscribe: SubscribeData;
  ViewContent: ViewContentData;
  PageView: PageViewData;
};

type TrackableEventName = keyof EventData;

interface AdditionalEventData {
  /**
   * Event ID
   *
   * @description Use for deduplication of events
   *
   * @example d2e6f4f5-8b43-4d4e-bd45-9d9e5e6b2d9a
   */
  eventID: string;
}

interface Props {
  pixelID: string;
  /**
   * Page View On Init
   *
   * @description Automatically track PageView event on init
   *
   * @default true
   */
  pageViewOnInit?: boolean;
  /**
   * Debug
   *
   * @description Events and errors are showing in the console
   *
   * @default true
   */
  debug?: boolean;
  /**
   * Automatic Configuration
   *
   * @description The Meta Pixel will send button click and page metadata (such as data structured according to Opengraph or Schema.org formats) from your website to improve your ads delivery and measurement and automate your Pixel setup.
   *
   * @default true
   */
  autoConfig?: boolean;
}

interface InitProps {
  /**
   * External ID
   *
   * @description Any unique ID from the advertiser, such as loyalty membership ID, user ID, and external cookie ID.
   *
   * @example a@example.com
   */
  external_id?: string;
  /**
   * Email
   *
   * @description Unhashed lowercase or hashed SHA-256
   *
   * @example jsmith@example.com or 6e3913852f512d76acff15d1e402c7502a5bbe6101745a7120a2a4833ebd2350
   */
  em?: string;
  /**
   * First Name
   *
   * @descriptionLowercase letters
   *
   * @example john
   */
  fn?: string;
  /**
   * Last Name
   *
   * @descriptionLowercase letters
   *
   * @example smith
   */
  ln?: string;
  /**
   * Phone
   *
   * @description Digits only including country code and area code
   *
   * @example 16505554444
   */
  ph?: number;
  /**
   * Gender
   *
   * @description Single lowercase letter, f or m, if unknown, leave blank
   *
   * @example f
   */
  ge?: 'f' | 'm' | '';
  /**
   * Birthdate
   *
   * @description Digits only with birth year, month, then day
   *
   * @example 19910526 for May 26, 1991.
   */
  db?: number;
  /**
   * City
   *
   * @description Lowercase with any spaces removed
   *
   * @example menlopark
   */
  ct?: string;
  /**
   * State or Province
   *
   * @description Lowercase two-letter state or province code
   *
   * @example ca
   */
  st?: string;
  /**
   * Zip or Postal Code
   *
   * @description String
   *
   * @example 94025
   */
  zp?: string;
  /**
   * Country
   *
   * @description Lowercase two-letter country code
   *
   * @example us
   */
  country?: string;
}

export type { TrackableEventName, EventData, AdditionalEventData, Props, InitProps };
