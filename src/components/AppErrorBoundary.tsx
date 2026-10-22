import { Component } from 'react'
import type { ErrorInfo, ReactNode } from 'react'

interface Props {
  children: ReactNode
}

interface State {
  hasError: boolean
}

export class AppErrorBoundary extends Component<Props, State> {
  state: State = { hasError: false }

  static getDerivedStateFromError(): State {
    return { hasError: true }
  }

  componentDidCatch(error: Error, errorInfo: ErrorInfo): void {
    console.error('[SarfQuest] Unhandled application error:', error, errorInfo)
  }

  render() {
    if (this.state.hasError) {
      return (
        <main className="error-boundary" role="alert">
          <div className="error-rune" aria-hidden="true">
            !
          </div>
          <p className="eyebrow">THE LANTERN FLICKERED</p>
          <h1>Something interrupted the quest.</h1>
          <p>The journey is safe. Return to the world map and try again.</p>
          <a className="primary-action error-action" href="/">
            Return to the world map <span>→</span>
          </a>
        </main>
      )
    }

    return this.props.children
  }
}
