import { StatusBar } from 'react-native';
import { Roboto_400Regular, Roboto_700Bold, useFonts } from '@expo-google-fonts/roboto';
import { GluestackUIProvider } from '@gluestack-ui/themed';

import { Routes } from '@routes/index';

import { Loading } from '@components/Loading';

import { config } from './config/gluestack-ui.config';

export default function App() {
  const [fontsLoaded] = useFonts({ Roboto_400Regular, Roboto_700Bold });
  return (
    <GluestackUIProvider config={config}>
      <StatusBar barStyle='light-content' backgroundColor='trasparent' translucent />
      {fontsLoaded ? <Routes /> : <Loading />}
    </GluestackUIProvider>
  );
}
