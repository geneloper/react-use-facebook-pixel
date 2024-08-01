import connectionScript from './connection';

interface EventData {
  eventID: string;
}

type TrackableEventName = 'Purchase' | 'PageView' | 'ViewContent' | 'InitiateCheckout';

export interface IFacebookPixel {
  trackEvent: (eventName: TrackableEventName, data?: object, eventData?: EventData) => void;
  setExternalId: (externalId: string) => void;
  getExternalId: () => string | undefined;
}

declare global {
  interface Window {
    fbq: any;
    _fbq: any;
  }
}

interface Props {
  pixelID: string;
  pageViewOnInit: boolean;
  debug: boolean;
}

interface InitProps {
  external_id: string;
}

class FacebookPixel implements IFacebookPixel {
  constructor({pixelID, debug, pageViewOnInit}: Props) {
    connectionScript()
    this.pixelID = pixelID;
    this.debug = debug
    this.pageViewOnInit = pageViewOnInit
  }

  pixelID: string;
  debug: boolean;
  consolePrefix = '[react-use-facebook-pixel]'
  public initialized = false
  pageViewOnInit = true
  externalId: string | undefined = undefined

  init({external_id}: InitProps) {
    if (this.initialized) {
      return;
    }
    this.initialized = true;
    window.fbq('init', this.pixelID, {external_id})
    if (this.pageViewOnInit) {
      this.trackEvent('PageView')
    }

    if (this.debug) {
      console.log(this.consolePrefix, 'Facebook Pixel initialized');
    }
  }

  setExternalId(externalId: string) {
    this.externalId = externalId
  }

  getExternalId() {
    return this.externalId 
  }

  trackEvent(eventName: TrackableEventName, data?: object, eventData?: EventData) {
    if (!this.initialized) {
      return;
    }
    window.fbq('track', eventName, data, eventData);

    if (this.debug) {
      console.log(this.consolePrefix, new Date().toLocaleTimeString(), 'Event tracked: ', eventName, data, eventData);
    }
  }

}

export { FacebookPixel };
