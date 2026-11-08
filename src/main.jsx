import React from 'react'
import ReactDOM from 'react-dom/client'
import App from './App.jsx'
import './index.css'

class ErrorBoundary extends React.Component {
  constructor(props) {
    super(props);
    this.state = { hasError: false, error: null };
  }

  static getDerivedStateFromError(error) {
    return { hasError: true, error };
  }

  componentDidCatch(error, errorInfo) {
    console.error("SantoSpirito App Crash Caught:", error, errorInfo);
  }

  render() {
    if (this.state.hasError) {
      return (
        <div className="min-h-screen w-full flex flex-col items-center justify-center p-6 bg-[#faf9f8] text-center font-sans">
          <div className="max-w-md bg-white p-8 rounded-2xl border border-neutral-200 shadow-xl space-y-4">
            <img 
              src="/brand/santospirito-logo-horizontal.svg" 
              alt="SantoSpirito" 
              className="h-10 mx-auto object-contain"
            />
            <h2 className="text-xl font-bold text-neutral-900">
              Estamos actualizando el catálogo
            </h2>
            <p className="text-xs text-neutral-600">
              Ocurrió un inconveniente temporal al cargar la vista. Por favor reintentá en unos segundos.
            </p>
            <button
              onClick={() => {
                this.setState({ hasError: false });
                window.location.reload();
              }}
              className="bg-teal-800 hover:bg-teal-900 text-white font-bold text-xs uppercase tracking-wider px-6 py-2.5 rounded-full transition shadow"
            >
              Recargar Tienda
            </button>
          </div>
        </div>
      );
    }
    return this.props.children;
  }
}

ReactDOM.createRoot(document.getElementById('root')).render(
  <React.StrictMode>
    <ErrorBoundary>
      <App />
    </ErrorBoundary>
  </React.StrictMode>,
)
