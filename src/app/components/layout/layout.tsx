'use client';

import { defaultTheme, Grid, Provider, View } from '@adobe/react-spectrum';
import { ToastContainer } from '@react-spectrum/toast';
import { QueryClient, QueryClientProvider } from '@tanstack/react-query';
import { ReactQueryDevtools } from '@tanstack/react-query-devtools';

import { AppContextProvider } from '@/app/appContext';

import { Header, Main } from './components';

const queryClient = new QueryClient({
  defaultOptions: {
    queries: {
      cacheTime: 1000 * 60,
    },
  },
});

export const Layout = ({ children }: { children: React.ReactNode }): JSX.Element => {
  return (
    <QueryClientProvider client={queryClient}>
      <ReactQueryDevtools initialIsOpen={false} />

      <Provider theme={defaultTheme} colorScheme="light">
        <ToastContainer />

        <AppContextProvider>
          <View width="100vw" height="100vh">
            <Grid
              areas={{
                base: ['header', 'main'],
              }}
              autoColumns="1fr"
              autoRows="auto 1fr"
              height="100%"
            >
              <Header />
              <Main>{children}</Main>
            </Grid>
          </View>
        </AppContextProvider>
      </Provider>
    </QueryClientProvider>
  );
};
