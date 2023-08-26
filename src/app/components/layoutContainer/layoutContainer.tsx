'use client';

import { defaultTheme, Grid, Provider, View } from '@adobe/react-spectrum';
import { ToastContainer } from '@react-spectrum/toast';
import { QueryClient, QueryClientProvider } from '@tanstack/react-query';
import { setDefaultOptions } from 'date-fns';
import { enGB } from 'date-fns/locale';

import { AppContextProvider } from '@/app/appContext';

import { Header, Main } from './components';

const queryClient = new QueryClient({
  defaultOptions: {
    queries: {
      cacheTime: 1000 * 60,
    },
  },
});

setDefaultOptions({ locale: enGB });

export const LayoutContainer = ({ children }: { children: React.ReactNode }): JSX.Element => {
  return (
    <QueryClientProvider client={queryClient}>
      <Provider theme={defaultTheme} colorScheme="light" locale="en-GB">
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
