export const revalidate = 3600; // Revalidate every 1 hour (ISR)

export default async function Home() {
  // Simulate fetching data from an external source
  const data = `Dynamic content generated at ${new Date().toISOString()}`;
  const lastUpdated = new Date().toISOString();

  return (
    <div style={{ padding: '20px', fontFamily: 'Arial' }}>
      <h1>Next.js Revalidation and Cache Demo</h1>
      <p><strong>Data:</strong> {data}</p>
      <p><strong>Last Updated:</strong> {lastUpdated}</p>
    </div>
  );
}