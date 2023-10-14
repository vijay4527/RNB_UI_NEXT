// cookieUtils.js
export function getCookie(name) {
  if (typeof document !== "undefined") {
    const cookies = document.cookie.split("; ");
    for (const cookie of cookies) {
      const [cookieName, cookieValue] = cookie.split("=");
      if (cookieName === name) {
        return cookieValue;
      }
    }
  }
  return null;
}

export function setCookie(name, value, days) {
  if (typeof document !== "undefined") {
    const expirationDate = new Date();
    expirationDate.setDate(expirationDate.getDate() + days);
    const cookieValue = `${name}=${value}; expires=${expirationDate.toUTCString()}; path=/`;
    document.cookie = cookieValue;
  }
}

export function removeCookie(name) {
  if (typeof document !== "undefined") {
    const expirationDate = new Date("Thu, 01 Jan 1970 00:00:00 GMT");
    const cookieValue = `${name}=; expires=${expirationDate.toUTCString()}; path=/`;
    document.cookie = cookieValue;
  }
}
