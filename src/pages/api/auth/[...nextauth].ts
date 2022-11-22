import type { NextAuthOptions } from 'next-auth'
import NextAuth from 'next-auth'
import CredentialsProvider from 'next-auth/providers/credentials'
import { ROUTES } from 'utils/constant'

export const authOptions: NextAuthOptions = {
  providers: [
    CredentialsProvider({
      // The name to display on the sign in form (e.g. 'Sign in with...')
      name: 'stockify',
      // The credentials is used to generate a suitable form on the sign in page.
      // You can specify whatever fields you are expecting to be submitted.
      // e.g. domain, username, password, 2FA token, etc.
      // You can pass any HTML attribute to the <input> tag through the object.
      credentials: {
        email: {
          label: 'email',
          type: 'email',
          placeholder: 'jsmith@example.com',
        },
        password: { label: 'Password', type: 'password' },
      },
      //@ts-ignore
      async authorize(credentials) {
        const payload = {
          email: credentials?.email,
          password: credentials?.password,
        }

        const response = await fetch(`${process.env.NEXT_PUBLIC_API_URL}auth`, {
          method: 'POST',
          body: JSON.stringify(payload),
          headers: {
            'Content-Type': 'application/json',
          },
        })

        const data = await response.json()

        if (response.status !== 200) {
          throw new Error('Invalid credentials')
        }

        return data.data
      },
    }),
  ],
  secret: process.env.JWT_SECRET,
  session: {
    maxAge: 90 * 24 * 60 * 60,
  },
  pages: {
    signIn: ROUTES.SIGNIN,
  },
  callbacks: {
    jwt: async ({ token, user }) => {
      if (user) {
        token.accessToken = user
      }

      return token
    },

    session: async ({ session, token }: any) => {
      const response = await fetch(`${process.env.NEXT_PUBLIC_API_URL}users`, {
        method: 'GET',
        headers: {
          'Content-Type': 'application/json',
          Authorization: `Bearer ${token.accessToken}`,
        },
      })

      if (response.status !== 200) {
        //@ts-ignore
        session.user = null
        //@ts-ignore
        session.accessToken = null
      }

      const data = await response.json()

      //@ts-ignore
      session.accessToken = token.accessToken
      session.user = data.data
      return session
    },
  },

  // Enable debug messages in the console if you are having problems
  debug: process.env.NODE_ENV === 'development',
}

export default NextAuth(authOptions)
