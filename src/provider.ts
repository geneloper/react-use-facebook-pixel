import { createContext, useContext, useEffect, useState } from 'react';
import { FacebookPixel } from './index';
import { InitProps } from './types';
import React from 'react';


// Context type definition
interface FacebookPixelContextType {
  pixel: FacebookPixel | null;
  isInitialized: boolean;
}

// Provider props interface  
interface FacebookPixelProviderProps {
  /** Your Facebook Pixel ID */
  pixelId: string;
  /** Enable or disable debug mode (default: true) */
  debug?: boolean;
  /** Automatically track PageView event on initialization (default: true) */
  pageViewOnInit?: boolean;
  /** Enable automatic configuration (default: true) */
  autoConfig?: boolean;
  /** Initial properties for pixel initialization */
  initProps?: InitProps;
  /** Children components */
  children?: any;
}

// Create the context
const FacebookPixelContext = createContext<FacebookPixelContextType | undefined>(undefined);

// Singleton instance to prevent reinitialization
let facebookPixelSingleton: { pixel: FacebookPixel; pixelId: string } | null = null;

/**
 * FacebookPixelProvider - React context provider for Facebook Pixel
 * 
 * This provider initializes the Facebook Pixel with the provided configuration
 * and makes it available to child components through React context.
 * 
 * @example
 * ```tsx
 * import { FacebookPixelProvider } from 'react-use-facebook-pixel';
 * 
 * function App() {
 *   return (
 *     <FacebookPixelProvider pixelId="YOUR_PIXEL_ID">
 *       <YourApp />
 *     </FacebookPixelProvider>
 *   );
 * }
 * ```
 */
export const FacebookPixelProvider = (props: FacebookPixelProviderProps) => {
  const {
    pixelId,
    debug = true,
    pageViewOnInit = true,
    autoConfig = true,
    initProps = {},
    children,
  } = props;

  const [pixel, setPixel] = useState<FacebookPixel | null>(null);
  const [isInitialized, setIsInitialized] = useState(false);

  useEffect(() => {
    // Only initialize once per pixelId
    if (!facebookPixelSingleton || facebookPixelSingleton.pixelId !== pixelId) {
      const initializeFacebookPixel = async () => {
        try {
          // Create new pixel instance
          const newPixel = new FacebookPixel({
            pixelID: pixelId,
            debug,
            pageViewOnInit,
            autoConfig,
          });

          // Initialize the pixel
          newPixel.init(initProps);

          // Update singleton and state
          facebookPixelSingleton = { pixel: newPixel, pixelId };
          setPixel(newPixel);
          setIsInitialized(true); 

          if (debug) {
            console.log(
              '[react-use-facebook-pixel]',
              new Date().toLocaleTimeString(),
              'Facebook Pixel Provider initialized with ID:', 
              pixelId
            );
          }
        } catch (error) {
          if (debug) {
            console.error(
              '[react-use-facebook-pixel]',
              new Date().toLocaleTimeString(),
              'Failed to initialize Facebook Pixel:',
              error
            );
          }
        }
      };

      initializeFacebookPixel();
    } else {
      // Use existing singleton
      setPixel(facebookPixelSingleton.pixel);
      setIsInitialized(true);
    }
  }, [pixelId, debug, pageViewOnInit, autoConfig, initProps]);

  const contextValue: FacebookPixelContextType = {
    pixel,
    isInitialized,
  };

  // Use React.createElement to avoid JSX issues
  return React.createElement(
    FacebookPixelContext.Provider,
    { value: contextValue },
    children
  );
};

/**
 * useFacebookPixel - React hook for accessing Facebook Pixel instance
 * 
 * This hook provides access to the Facebook Pixel instance and initialization status.
 * Must be used within a FacebookPixelProvider.
 * 
 * @returns {FacebookPixelContextType} Object containing pixel instance and initialization status
 * 
 * @throws {Error} When used outside of FacebookPixelProvider
 * 
 * @example
 * ```tsx
 * import { useFacebookPixel, TrackableEventNameEnum } from 'react-use-facebook-pixel';
 * 
 * function MyComponent() {
 *   const { pixel, isInitialized } = useFacebookPixel();
 * 
 *   const handlePurchase = () => {
 *     if (pixel && isInitialized) {
 *       pixel.trackEvent(TrackableEventNameEnum.Purchase, {
 *         content_ids: ['1234'],
 *         currency: 'USD',
 *         value: 100.0,
 *       });
 *     }
 *   };
 * 
 *   return (
 *     <button onClick={handlePurchase}>
 *       Track Purchase
 *     </button>
 *   );
 * }
 * ```
 */
export const useFacebookPixel = (): FacebookPixelContextType => {
  const context = useContext(FacebookPixelContext);
  
  if (context === undefined) {
    throw new Error(
      'useFacebookPixel must be used within a FacebookPixelProvider. ' +
      'Make sure to wrap your component tree with <FacebookPixelProvider>.'
    );
  }
  
  return context;
};

/**
 * Higher-Order Component for Facebook Pixel
 * 
 * This HOC automatically wraps a component with FacebookPixelProvider.
 * Useful for quick setup without manually adding the provider.
 * 
 * @param WrappedComponent - Component to wrap
 * @param pixelConfig - Facebook Pixel configuration
 * @returns Enhanced component with Facebook Pixel context
 * 
 * @example
 * ```tsx
 * import { withFacebookPixel } from 'react-use-facebook-pixel';
 * 
 * const MyApp = () => <div>My App</div>;
 * 
 * export default withFacebookPixel(MyApp, {
 *   pixelId: 'YOUR_PIXEL_ID',
 *   debug: true,
 * });
 * ```
 */
export const withFacebookPixel = <P extends object>(
  WrappedComponent: any,
  pixelConfig: Omit<FacebookPixelProviderProps, 'children'>
) => {
  const WithFacebookPixelComponent = (props: P) => {
    return React.createElement(
      FacebookPixelProvider,
      pixelConfig,
      React.createElement(WrappedComponent, props)
    );
  };

  WithFacebookPixelComponent.displayName = `withFacebookPixel(${
    WrappedComponent.displayName || WrappedComponent.name || 'Component'
  })`;

  return WithFacebookPixelComponent;
};
