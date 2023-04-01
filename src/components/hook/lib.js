export function saveToStorage(key, value) {
  localStorage.setItem(key, JSON.stringify(value));
}

export function getFromStorage(key) {
  return localStorage.getItem(key) ? JSON.parse(localStorage.getItem(key)) : [];
}

export function removeFromStorage(key) {
  localStorage.removeItem(key);
}

export const currentUser = getFromStorage("currentUser");

export const setTouched = set => {
  return set(prev => ({
    ...prev,
    touched: true
  }));
};