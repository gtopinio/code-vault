import '@styles/globals.css'

export const metadata = {
    title: "CodeVault",
    description: "Generate and Manage Encrypted Passwords"
}

interface RootLayoutProps {
  children: React.ReactNode;
}

const RootLayout:React.FC<RootLayoutProps> = ({ children }) => {
  return (
    <html lang='en'>
        <body className='bodyContent bodyColor'>
            <main className='mainContent'>
                {children}
            </main>
        </body>
    </html>
  )
}

export default RootLayout;