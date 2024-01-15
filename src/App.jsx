import { useState } from 'react';
import * as jose from 'jose';
import './index.css'

function App() {
  const [email, setEmail] = useState("");

  async function handleSignUp(event) {

    event.preventDefault();
    // replace any secret key with your secret key
    const secret = new TextEncoder().encode(
      'cc7e0d44fd473002f1c42167459001140ec6389b7353f8088f4d9a95f2f596f2',
    );
    // Algorithm to be used for signing 
    const alg = 'HS256';
    // signing jwt and generating token with payload 
    const jwt = await new jose.SignJWT({ email: email })
      .setProtectedHeader({ alg })
      .sign(secret)

    console.log('Signed Token:', jwt);
    localStorage.setItem('token', jwt);
    // verifying the token

    let token = localStorage.getItem('token');
    const { payload, protectedHeader } = await jose.jwtVerify(token, secret);

    console.log(protectedHeader)
    console.log(payload)
  }

  return (
    <>

      <div className="container">
        <form action='POST'>
          <input type="text" name={email} onChange={(e) => setEmail(e.target.value)} placeholder='Enter your email' />
          <button onClick={handleSignUp}>Submit</button>
        </form>
      </div>
    </>

  )
}

export default App;