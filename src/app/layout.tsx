import { FunctionRegistryProvider } from '../contexts/FunctionRegistryProvider'

export default function RootLayout({ children }: { children: React.ReactNode }) {
  return (
    <html lang="en">
      <body>
        <FunctionRegistryProvider>
          {children}
        </FunctionRegistryProvider>
      </body>
    </html>
  )
}