// import { FormEvent } from 'react'
// import { useRouter } from 'next/router'
 
// export default function LoginPage() {
//   const router = useRouter()
 
//   async function handleSubmit(event) {
//     event.preventDefault()
 
//     const formData = new FormData(event.currentTarget)
//     const email = formData.get('email')
//     const password = formData.get('password')
 
//     const response = await fetch('https://api.planninggiant.com/v1/login', {
//       method: 'POST',
//       headers: { 'Content-Type': 'application/json' },
//       body: JSON.stringify({ email, password }),
//     })
 
//     if (response.ok) {
//       router.push('/profile')
//     } else {
//      console.error();
      
//     }
//   }
 
//   return (
//     <form onSubmit={handleSubmit}>
//       <input type="email" name="email" placeholder="Email" required />
//       <input type="password" name="password" placeholder="Password" required />
//       <button type="submit">Login</button>
//     </form>
//   )
// }

// pages/index.js

export default function Home() {
  return (
    <div>
      <h1>Home Page</h1>
      <p>Please login to continue.</p>
    </div>
  );
}
