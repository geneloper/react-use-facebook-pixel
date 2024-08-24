# `react-use-facebook-pixel`

`react-use-facebook-pixel` is a lightweight React hook library for integrating Facebook Pixel with your React application. It provides an easy way to initialize and track events with Facebook Pixel, allowing you to measure the effectiveness of your ads and understand user interactions.

## Features

- **Automatic Initialization**: Initialize Facebook Pixel with optional automatic page view tracking.
- **Event Tracking**: Track various events such as AddToCart, Purchase, Lead, and more.
- **Debug Mode**: Optional debug mode to log initialization and event tracking information.
- **Customizable Configuration**: Set external IDs, configure automatic tracking, and more.

## Installation

Install the package via npm or yarn:

```bash
npm install react-use-facebook-pixel
```

```bash
yarn add react-use-facebook-pixel
```

## Usage

### Initialization

Create an instance of `FacebookPixel` and initialize it with your pixel ID:

```javascript
// src/hooks/useFacebookPixel.ts
import { useEffect, useState } from 'react';
import { FacebookPixel } from 'react-use-facebook-pixel';

// to prevent pixel reinitialization on every rerender
let facebookPixelSingleton: FacebookPixel | null = null;
const useFacebookPixel = () => {
  const [facebookPixel, setFacebookPixel] = useState<FacebookPixel | null>(null);

  useEffect(() => {
    if (!facebookPixelSingleton) {
      const initializeFacebookPixel = async () => {
        const pixel = new FacebookPixel({
          pixelID: 'PIXEL_ID',
        });

        pixel.init({});
        pixel.trackEvent('PageView');

        facebookPixelSingleton = pixel;
        setFacebookPixel(pixel);
      };

      initializeFacebookPixel();
    }
  }, []);

  return facebookPixel;
};

export default useFacebookPixel;
```

### Tracking Events

Track simple events

```javascript
pixel.trackEvent('ViewContent', {
  content_ids: ['1234'],
});
```

Track events with optional data and additional information:

```javascript
pixel.trackEvent(
  'Purchase',
  {
    content_ids: ['1234', '5678'],
    content_type: 'product',
    contents: [{ id: '1234', quantity: 1 }],
    currency: 'USD',
    value: 100.0,
  },
  {
    eventID: 'd2e6f4f5-8b43-4d4e-bd45-9d9e5e6b2d9a',
  }
);
```

Or use types for events & events data:

```javascript
import { AdditionalEventData, EventData, TrackableEventNameEnum } from 'react-use-facebook-pixel';

const eventData: EventData[TrackableEventNameEnum.Purchase] = {
  content_ids: ['21312'],
  currency: 'USD',
  value: 1
};

const additionalEventData: AdditionalEventData = {
  eventID: 'd2e6f4f5-8b43-4d4e-bd45-9d9e5e6b2d9a'
};

facebookPixel.trackEvent(TrackableEventNameEnum.Purchase, eventData, additionalEventData);
```

### Available Events

- `AddPaymentInfo`
- `AddToCart`
- `AddToWishlist`
- `CompleteRegistration`
- `Contact`
- `CustomizeProduct`
- `Donate`
- `FindLocation`
- `InitiateCheckout`
- `Lead`
- `Purchase`
- `Schedule`
- `Search`
- `StartTrial`
- `SubmitApplication`
- `Subscribe`
- `ViewContent`
- `PageView`

### API Reference

#### `FacebookPixel`

**Constructor**

```typescript
new FacebookPixel(props: Props)
```

- `pixelID` (string): Your Facebook Pixel ID.
- `debug` (boolean, optional): Enable or disable debug mode (default: `true`).
- `pageViewOnInit` (boolean, optional): Automatically track PageView event on initialization (default: `true`).
- `autoConfig` (boolean, optional): Enable automatic configuration (default: `true`).

**Methods**

- `init(props: InitProps)`: Initializes the Facebook Pixel with optional properties.
- `setExternalId(externalId: string)`: Sets an external ID for tracking.
- `getExternalId()`: Retrieves the current external ID.
- `trackEvent<K extends TrackableEventName>(eventName: K, data?: EventData[K], additionalData?: AdditionalEventData)`: Tracks an event with optional data and additional information.

## Configuration Options

**`Props` Interface**

- `pixelID` (string): Your Facebook Pixel ID.
- `pageViewOnInit` (boolean, optional): Automatically track PageView event on initialization.
- `debug` (boolean, optional): Enable or disable debug mode.
- `autoConfig` (boolean, optional): Enable or disable automatic configuration.

**`InitProps` Interface**

- `external_id` (string, optional): Unique ID from the advertiser.
- `em` (string, optional): Email (unhashed lowercase or hashed SHA-256).
- `fn` (string, optional): First name (lowercase letters).
- `ln` (string, optional): Last name (lowercase letters).
- `ph` (number, optional): Phone number (digits only).
- `ge` (string, optional): Gender (single lowercase letter: 'f' or 'm').
- `db` (number, optional): Birthdate (digits only: YYYYMMDD).
- `ct` (string, optional): City (lowercase with spaces removed).
- `st` (string, optional): State or Province (lowercase two-letter code).
- `zp` (string, optional): Zip or Postal Code.
- `country` (string, optional): Country (lowercase two-letter code).

## License

This package is licensed under the MIT License. See the [LICENSE](./LICENSE) file for details.

## Contributing

Contributions are welcome! Please submit issues and pull requests on the [GitHub repository](https://github.com/geneloper/react-use-facebook-pixel).

## Acknowledgments

This package uses the Facebook Pixel library for tracking and analytics. For more information, visit the [Facebook Pixel documentation](https://developers.facebook.com/docs/meta-pixel/).
