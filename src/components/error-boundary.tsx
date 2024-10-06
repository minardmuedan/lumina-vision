'use client'

import React, { Component, ErrorInfo, ReactNode } from 'react'
import { Button } from '@/components/ui/button'
import { cn } from '@/lib/utils'

interface Props {
  children: ReactNode
  className?: string
}

interface State {
  hasError: boolean
  error: Error | null
}

class ErrorBoundary extends Component<Props, State> {
  state: State = {
    hasError: false,
    error: null,
  }

  static getDerivedStateFromError(error: Error): State {
    return { hasError: true, error }
  }

  componentDidCatch(error: Error, errorInfo: ErrorInfo) {
    console.error('Error caught in ErrorBoundary:', error, errorInfo)
  }

  resetErrorBoundary = () => {
    this.setState({ hasError: false, error: null })
  }

  render() {
    const { hasError, error } = this.state
    const { className } = this.props
    if (hasError && error) {
      return (
        <div className={cn('flex min-h-dvhMinusNav flex-col items-center justify-center', className)}>
          <h2>{error.message}</h2>
          <Button onClick={this.resetErrorBoundary}>Try again</Button>
        </div>
      )
    }

    return this.props.children
  }
}
;(ErrorBoundary as unknown as React.ComponentType).displayName = 'ErrorBoundary'

export default ErrorBoundary
