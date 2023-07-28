import '@styles/globals.css';
import Nav from '@components/Nav';
import Provider from '@components/Provider';

export const metadata = {
    title: "CodeVault",
    description: "Generate and Manage Encrypted Passwords",
}


const RootLayout = ({ children }) => {
  return (
    <html lang='en'>
        <link rel="icon" href="/favicon.ico" type="image/x-icon"/>
        <body className='bodyContent bodyColor'>
          <Provider>
            <main className='mainContent'>
                <Nav/>
                {children}
            </main>
          </Provider>
        </body>
    </html>
  )
}

export default RootLayout;