// @flow

/*
 * Long term storage for persistence of state/etc
 */
const StorageService = {
  get(key: string): any {
    try {
      return JSON.parse(window.localStorage.getItem(key));
    } catch (error) {
      // Noop
    }
  },

  set(key: string, value: any): void {
    try {
      window.localStorage.setItem(key, JSON.stringify(value));
    } catch (error) {
      // Noop
    }
  },
};

export default StorageService;
