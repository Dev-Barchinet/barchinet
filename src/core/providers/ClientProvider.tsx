'use client'
import React, { PropsWithChildren } from 'react'
import { SessionProvider } from 'next-auth/react'


const ClientProvider = ({ children }: PropsWithChildren) => {
  return (
    <SessionProvider refetchInterval={3 * 60}>
        {children}
    </SessionProvider>
  )
}

export default ClientProvider