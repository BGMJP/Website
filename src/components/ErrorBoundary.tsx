import React, { Component, ReactNode } from 'react';

interface Props {
  children: ReactNode;
  fallback?: ReactNode;
  sectionName?: string;
}

interface State {
  hasError: boolean;
  error?: Error;
  errorInfo?: React.ErrorInfo;
  retryCount: number;
}

export class ErrorBoundary extends Component<Props, State> {
  private retryTimer?: NodeJS.Timeout;

  constructor(props: Props) {
    super(props);
    this.state = { 
      hasError: false, 
      retryCount: 0 
    };
  }

  static getDerivedStateFromError(error: Error): Partial<State> {
    return { hasError: true, error };
  }

  componentDidCatch(error: Error, errorInfo: React.ErrorInfo) {
    console.error('ErrorBoundary caught an error:', error, errorInfo);
    
    // Log additional context for debugging
    console.error('Error details:', {
      message: error.message,
      stack: error.stack,
      componentStack: errorInfo.componentStack,
      sectionName: this.props.sectionName,
      retryCount: this.state.retryCount
    });
    
    this.setState({ errorInfo });
  }

  handleRetry = () => {
    this.setState(prevState => ({
      hasError: false,
      error: undefined,
      errorInfo: undefined,
      retryCount: prevState.retryCount + 1
    }));
  };

  handleReload = () => {
    try {
      window.location.reload();
    } catch (error) {
      console.error('Failed to reload page:', error);
      // Fallback: try to navigate to home
      window.location.href = '/';
    }
  };

  componentWillUnmount() {
    if (this.retryTimer) {
      clearTimeout(this.retryTimer);
    }
  }

  render() {
    if (this.state.hasError) {
      if (this.props.fallback) {
        return this.props.fallback;
      }

      const isSection = this.props.sectionName;
      const containerClass = isSection 
        ? "py-8 mx-4" 
        : "min-h-screen flex items-center justify-center bg-gray-50";

      return (
        <div className={containerClass}>
          <div className="max-w-md mx-auto text-center p-6">
            <div className="w-16 h-16 bg-red-100 rounded-full flex items-center justify-center mx-auto mb-4">
              <svg className="w-8 h-8 text-red-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 9v2m0 4h.01m-6.938 4h13.856c1.54 0 2.502-1.667 1.732-2.5L13.732 4c-.77-.833-1.964-.833-2.732 0L4.082 16.5c-.77.833.192 2.5 1.732 2.5z" />
              </svg>
            </div>
            
            <h2 className="text-xl font-semibold text-gray-900 mb-2">
              {isSection ? `${this.props.sectionName} 섹션` : '페이지'} 로딩 중 문제가 발생했습니다
            </h2>
            
            <p className="text-gray-600 mb-4">
              {this.state.error?.message?.includes('timeout') || this.state.error?.message?.includes('load timeout')
                ? '로딩 시간이 초과되었습니다. 네트워크 연결을 확인해주세요.'
                : '일시적인 오류가 발생했습니다. 잠시 후 다시 시도해주세요.'
              }
            </p>

            {this.state.retryCount < 3 && (
              <div className="space-y-2">
                <button
                  onClick={this.handleRetry}
                  className="bg-[#1C3D5A] hover:bg-[#15324A] text-white px-6 py-2 rounded-lg transition-colors duration-200 mr-2"
                >
                  다시 시도 ({3 - this.state.retryCount}회 남음)
                </button>
                <button
                  onClick={this.handleReload}
                  className="bg-[#FFB800] hover:bg-[#E5A600] text-[#1C3D5A] px-6 py-2 rounded-lg transition-colors duration-200"
                >
                  페이지 새로고침
                </button>
              </div>
            )}

            {this.state.retryCount >= 3 && (
              <div className="space-y-2">
                <p className="text-sm text-gray-500 mb-2">
                  재시도 횟수를 초과했습니다.
                </p>
                <button
                  onClick={this.handleReload}
                  className="bg-[#FFB800] hover:bg-[#E5A600] text-[#1C3D5A] px-6 py-2 rounded-lg transition-colors duration-200"
                >
                  페이지 새로고침
                </button>
              </div>
            )}

            {process.env.NODE_ENV === 'development' && this.state.error && (
              <details className="mt-4 text-left">
                <summary className="cursor-pointer text-sm text-gray-500">개발자 정보</summary>
                <pre className="mt-2 text-xs bg-gray-100 p-2 rounded overflow-auto">
                  {this.state.error.stack}
                </pre>
              </details>
            )}
          </div>
        </div>
      );
    }

    return this.props.children;
  }
}