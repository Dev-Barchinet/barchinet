'use client';

import React, { PropsWithChildren } from 'react';
import { SessionProvider } from 'next-auth/react';
import { QueryClient, QueryClientProvider } from 'react-query';
import { Toaster } from 'react-hot-toast';

// Create a client instance for React Query
const queryClient = new QueryClient();

const ClientProvider = ({ children }: PropsWithChildren) => {
  return (
    <SessionProvider refetchInterval={3 * 60}>
      <QueryClientProvider client={queryClient}>
        {children}
        <Toaster />
      </QueryClientProvider>
    </SessionProvider>
  );
};

export default ClientProvider;
