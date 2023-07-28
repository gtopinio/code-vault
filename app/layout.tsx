import '@styles/globals.css';
import Nav from '@components/Nav';
import Provider from '@components/Provider';

export const metadata = {
    title: "CodeVault",
    description: "Generate and Manage Encrypted Passwords",
}

interface RootLayoutProps {
  children: React.ReactNode;
}

const RootLayout:React.FC<RootLayoutProps> = ({ children }) => {
  return (
    <html lang='en'>
        <link rel="icon" href="/favicon.ico" type="image/x-icon"/>
        <body className='bodyContent bodyColor'>
            <main className='mainContent'>
                <Nav/>
                {children}
            </main>
        </body>
    </html>
  )
}

export default RootLayout;