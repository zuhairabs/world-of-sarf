import { HeadContent, Scripts, createRootRoute } from '@tanstack/react-router'
import { TanStackRouterDevtoolsPanel } from '@tanstack/react-router-devtools'
import { TanStackDevtools } from '@tanstack/react-devtools'
import { AppErrorBoundary } from '../components/AppErrorBoundary'
import appCss from '../styles.css?url'

export const Route = createRootRoute({
  head: () => ({
    meta: [
      { charSet: 'utf-8' },
      { name: 'viewport', content: 'width=device-width, initial-scale=1' },
      { title: 'Sarf Quest — Master Arabic Morphology' },
      {
        name: 'description',
        content:
          'A game-first Arabic Sarf learning app. Explore an adventure world, match seeghas, build words, and master the abwaab of ثلاثي مزيد.',
      },
      { name: 'theme-color', content: '#131e2e' },
    ],
    links: [
      // Preconnect for Google Fonts (already imported in CSS)
      { rel: 'preconnect', href: 'https://fonts.googleapis.com' },
      {
        rel: 'preconnect',
        href: 'https://fonts.gstatic.com',
        crossOrigin: 'anonymous',
      },
      { rel: 'stylesheet', href: appCss },
    ],
  }),
  shellComponent: RootDocument,
})

function RootDocument({ children }: { children: React.ReactNode }) {
  return (
    // lang="ar" is NOT set on <html> — the app UI is bilingual.
    // Individual Arabic text nodes use lang="ar" and dir="rtl" locally.
    <html lang="en">
      <head>
        <HeadContent />
      </head>
      <body>
        <AppErrorBoundary>{children}</AppErrorBoundary>
        <TanStackDevtools
          config={{ position: 'bottom-right' }}
          plugins={[
            {
              name: 'Tanstack Router',
              render: <TanStackRouterDevtoolsPanel />,
            },
          ]}
        />
        <Scripts />
      </body>
    </html>
  )
}
