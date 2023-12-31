import '@styles/globals.css';
import Nav from '@components/Nav';
import Provider from '@components/Provider';
import 'primereact/resources/themes/soho-dark/theme.css';  
import 'primereact/resources/primereact.min.css';
import 'primeicons/primeicons.css';

export const metadata = {
    title: "Code Vault | Generate and Manage Encrypted Passwords",
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