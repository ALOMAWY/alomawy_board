// Set Item In Local Storage

export function setItemInLocalStorage<T>(key: string, value: T) {
  try {
    window.localStorage.setItem(key, JSON.stringify(value));
  } catch (error) {
    console.error(error);
  }
}

// Get Item From Local Storage

export function getItemFromLocalStorage<T>(key: string, initalValue: T) {
  try {
    const value = window.localStorage.getItem(key);

    return value ? JSON.parse(value) : initalValue;
  } catch (error) {
    console.error(error);
  }
}

// Delete Item In Local Storage

export function removeItemInLocalStorage(key: string) {
  try {
    window.localStorage.removeItem(key);
  } catch (error) {
    console.error(error);
  }
}

// Clear Local Storage

export function clearLocalStorage() {
  try {
    window.localStorage.clear();
  } catch (error) {
    console.error(error);
  }
}
