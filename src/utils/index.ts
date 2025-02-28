/**
 * Utility functions used throughout the application
 */

/**
 * Combines multiple class names into a single string
 * @param classes - Array of class names or objects with class names as keys and booleans as values
 * @returns Combined class names as a string
 */
export const classNames = (...classes: (string | undefined | null | false | Record<string, boolean>)[]): string => {
  return classes
    .filter(Boolean)
    .map((cls) => {
      if (typeof cls === 'object' && cls !== null) {
        return Object.entries(cls)
          .filter(([_, value]) => Boolean(value))
          .map(([key]) => key)
          .join(' ');
      }
      return cls;
    })
    .join(' ')
    .trim();
};

/**
 * Formats a price as a string with currency symbol
 * @param price - The price to format
 * @param currency - The currency symbol to use (default: $)
 * @returns Formatted price string
 */
export const formatPrice = (price: number, currency = '$'): string => {
  return `${currency}${price.toFixed(2)}`;
};

/**
 * Truncates a string to a specified length and adds ellipsis if needed
 * @param str - The string to truncate
 * @param maxLength - Maximum length of the string
 * @returns Truncated string
 */
export const truncateString = (str: string, maxLength: number): string => {
  if (str.length <= maxLength) return str;
  return `${str.slice(0, maxLength)}...`;
};

/**
 * Gets the current year
 * @returns Current year as a number
 */
export const getCurrentYear = (): number => {
  return new Date().getFullYear();
};

/**
 * Debounces a function call
 * @param func - The function to debounce
 * @param wait - The time to wait in milliseconds
 * @returns Debounced function
 */
export const debounce = <T extends (...args: any[]) => any>(func: T, wait: number): ((...args: Parameters<T>) => void) => {
  let timeout: ReturnType<typeof setTimeout> | null = null;
  
  return (...args: Parameters<T>): void => {
    const later = () => {
      timeout = null;
      func(...args);
    };
    
    if (timeout !== null) {
      clearTimeout(timeout);
    }
    timeout = setTimeout(later, wait);
  };
};
