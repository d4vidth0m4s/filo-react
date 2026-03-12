import type { FallbackProps } from 'react-error-boundary';

export function ErrorFallback({ error, resetErrorBoundary }: FallbackProps) {
  const errorMessage = error instanceof Error ? error.message : String(error);

  return (
    <div
      role="alert"
      style={{
        padding: '20px',
        border: '1px solid red',
        margin: '20px',
        borderRadius: '5px',
      }}
    >
      <h2>Something went wrong:</h2>
      <pre style={{ color: 'red' }}>{errorMessage}</pre>
      <button
        onClick={resetErrorBoundary}
        style={{ marginTop: '10px', padding: '5px 10px' }}
      >
        Try again
      </button>
    </div>
  );
}
