'use client'

import React, { Component, ErrorInfo, ReactNode } from 'react'
import { Button } from '@/components/ui/button'
import { cn } from '@/lib/utils'

interface CustomError extends Error {
  digest?: string
}

interface Props {
  children: ReactNode
  className?: string
}

interface State {
  hasError: boolean
  error: CustomError | null
  digest?: string
}

class ErrorBoundary extends Component<Props, State> {
  state: State = {
    hasError: false,
    error: null,
    digest: undefined,
  }

  static getDerivedStateFromError(error: CustomError): State {
    return { hasError: true, error, digest: error.digest }
  }

  componentDidCatch(error: CustomError, errorInfo: ErrorInfo) {
    console.error('Error caught in ErrorBoundary:', error, errorInfo)
  }

  reloadPage = () => {
    window.location.reload() // Reloads the entire page
  }

  render() {
    const { hasError, error } = this.state
    const { className } = this.props
    if (hasError && error) {
      return (
        <div className={cn('flex min-h-dvhMinusNav flex-col items-center justify-center', className)}>
          <h2>{error.message}</h2>
          <Button onClick={this.reloadPage}>Reload Page</Button>
        </div>
      )
    }

    return this.props.children
  }
}

;(ErrorBoundary as unknown as React.ComponentType).displayName = 'ErrorBoundary'

export default ErrorBoundary
