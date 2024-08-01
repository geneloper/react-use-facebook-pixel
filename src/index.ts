import connectionScript from './connection';
import { AdditionalData, InitProps, Props, TrackableEventData, TrackableEventName } from './types';
import { TrackableEventNameEnum } from './enums';

class FacebookPixel {
  constructor({ pixelID, debug = true, pageViewOnInit = true, autoConfig = true }: Props) {
    connectionScript();
    this.pixelID = pixelID;
    this.debug = debug;
    this.pageViewOnInit = pageViewOnInit;
    this.autoConfig = autoConfig;
  }

  private autoConfig: boolean;
  private pixelID: string;
  private debug: boolean;
  private consolePrefix = '[react-use-facebook-pixel]';
  private initialized = false;
  private pageViewOnInit: boolean;
  private externalId: string | undefined = undefined;

  init(props: InitProps) {
    if (this.initialized) {
      return;
    }
    this.initialized = true;
    window.fbq('set', 'autoConfig', this.autoConfig, this.pixelID);
    window.fbq('init', this.pixelID, props);
    if (this.pageViewOnInit) {
      this.trackEvent('PageView');
    }

    if (this.debug) {
      console.log(
        this.consolePrefix,
        new Date().toLocaleTimeString(),
        'Facebook Pixel initialized'
      );
    }
  }

  setExternalId(externalId: string) {
    this.externalId = externalId;
  }

  getExternalId() {
    return this.externalId;
  }

  trackEvent<K extends TrackableEventName>(
    eventName: K,
    data?: TrackableEventData[K],
    additionalData?: AdditionalData
  ) {
    if (!this.initialized && this.debug) {
      console.error(
        this.consolePrefix,
        new Date().toLocaleTimeString(),
        '\nError',
        '\nYou tried to track event before initialization'
      );
      return;
    }
    window.fbq('track', eventName, data, additionalData);

    if (this.debug) {
      console.log(
        this.consolePrefix,
        new Date().toLocaleTimeString(),
        '\nEvent tracked.',
        '\nEvent name: ',
        eventName,
        '\nEvent data: ',
        data,
        '\nEvent additiona data',
        additionalData
      );
    }
  }
}

export { FacebookPixel, TrackableEventNameEnum };
