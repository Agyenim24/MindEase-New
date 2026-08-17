import React from 'react';

class ErrorBoundary extends React.Component {
  constructor(props) {
    super(props);
    this.state = { hasError: false, error: null };
  }

  static getDerivedStateFromError(error) {
    return { hasError: true, error };
  }

  componentDidCatch(error, errorInfo) {
    console.error('MindEase React ErrorBoundary caught an error:', error, errorInfo);
  }

  handleReset = () => {
    this.setState({ hasError: false, error: null });
    window.location.reload();
  };

  render() {
    if (this.state.hasError) {
      return (
        <div className="min-h-screen flex flex-col items-center justify-center p-6 bg-surface text-on-surface text-center space-y-4">
          <div className="w-16 h-16 rounded-full bg-rose-500/10 text-rose-600 flex items-center justify-center font-bold">
            <span className="material-symbols-outlined text-3xl">warning</span>
          </div>
          <h2 className="text-xl font-bold text-on-surface">Something went wrong</h2>
          <p className="text-xs text-on-surface-variant max-w-md">
            We encountered an unexpected rendering error. Please click below to refresh the application.
          </p>
          <div className="p-3 bg-surface-container-low rounded-xl text-left max-w-lg overflow-x-auto text-[11px] font-mono text-outline border border-outline-variant/20">
            {this.state.error?.toString() || 'Unknown error'}
          </div>
          <button
            onClick={this.handleReset}
            className="px-6 py-2.5 bg-primary text-white text-xs font-bold rounded-full hover:opacity-90 transition shadow"
          >
            Reload Page
          </button>
        </div>
      );
    }

    return this.props.children;
  }
}

export default ErrorBoundary;
