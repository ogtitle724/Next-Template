export function isMobileBrowser() {
  // Get the user agent string
  const userAgent = navigator.userAgent;

  // Check if the user agent string contains keywords indicating a mobile device
  return /Android|webOS|iPhone|iPad|iPod|BlackBerry|IEMobile|Opera Mini/i.test(
    userAgent
  );
}
