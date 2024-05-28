export function getHeaders() {
  const nonce = Buffer.from(crypto.randomUUID()).toString("base64");
  const cspOptions = `
      default-src 'self'; 
      script-src 'nonce-${nonce}' 'strict-dynamic' ${
    process.env.NODE_ENV === "production" ? "" : `'unsafe-eval'`
  }; 
      script-src-elem 'self' https://www.googletagmanager.com 'unsafe-inline';
      style-src 'self' https://www.googletagmanager.com  https://fonts.googleapis.com 'unsafe-inline'; 
      img-src 'self' ${
        process.env.AWS_S3_BUCKET_URL
      } https://www.google-analytics.com https://www.googletagmanager.com  https://fonts.gstatic.com data:; 
      font-src 'self' https://fonts.gstatic.com; 
      object-src 'none'; 
      base-uri 'self'; 
      form-action 'self' https://accounts.google.com; 
      frame-ancestors 'none'; 
      connect-src 'self' https://www.google-analytics.com;
    `;

  const headerOptions = {
    "Access-Control-Allow-Methods": "GET, POST, PUT, PATCH, DELETE, OPTIONS",
    "Access-Control-Allow-Headers":
      "X-CSRF-Token, X-Requested-With, Accept, Accept-Version, Authorization, Content-Security-Policy, Content-Length, Content-MD5, Content-Type, Date, X-Api-Version",
    "Access-Control-Allow-Credentials": "true",
    "x-nonce": nonce,
    "Content-Security-Policy": cspOptions.replace(/\s{2,}/g, " ").trim(),
  };

  return headerOptions;
}
