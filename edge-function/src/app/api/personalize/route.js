import { NextResponse } from 'next/server';

export const runtime = 'edge'; // Specify Edge Runtime

export async function GET(request) {
  const { geo } = request;
  const country = geo?.country || 'US'; // Default to US if geo unavailable
  const currency = country === 'US' ? 'USD' : 'EUR';

  // Fetch the original response from /products page
  const originResponse = await fetch(new URL('/products', request.url), {
    headers: request.headers,
  });

  // Get the original HTML
  const html = await originResponse.text();

  // Modify the response to inject currency
  const modifiedHtml = html.replace('{{CURRENCY}}', currency);

  // Create a new response with modified content and custom header
  const response = new NextResponse(modifiedHtml, {
    status: originResponse.status,
    headers: {
      ...originResponse.headers,
      'X-Custom-Country': country,
      'Content-Type': 'text/html',
    },
  });

  return response;
}