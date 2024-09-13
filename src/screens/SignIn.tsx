import { Platform } from 'react-native';
import { Controller, useForm } from "react-hook-form";
import { useNavigation } from '@react-navigation/native';
import { Center, Heading, Image, KeyboardAvoidingView, ScrollView, Text, VStack } from '@gluestack-ui/themed';
import { yupResolver } from "@hookform/resolvers/yup";
import * as yup from 'yup';

import { AuthNavigatorRoutesProps } from '@routes/auth.routes';

import BackgroundImg from '@assets/background.png';
import Logo from '@assets/logo.svg';

import { Input } from '@components/Input';
import { Button } from '@components/Button';
import React from "react";

type FormDataProps = {
  email: string;
  password: string;
}

const EMAIL_REGX = /^[a-zA-Z0-9_\-]+(\.[a-zA-Z0-9_\-]+)*@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.)|(([a-zA-Z0-9\-]+\.)+))([a-zA-Z]{2,4}|[0-9]{1,3})$/i;

const signInSchema = yup.object({
  email: yup.string().required('Informe o e-mail').matches(EMAIL_REGX, 'E-mail inválido'),
  password: yup.string().required('Informe a senha').min(6, 'A senha precisa ter pelo menos 6 dígitos'),
});

export function SignIn() {
  const navigation = useNavigation<AuthNavigatorRoutesProps>();

  const { control, handleSubmit, formState: { errors } } = useForm<FormDataProps>({
    resolver: yupResolver(signInSchema)
  });

  function handleNewAccount() {
    navigation.navigate('signUp');
  }

  function handleSignIn({ email, password }: FormDataProps) {
    console.log({ email, password });
  }

  return (
    <KeyboardAvoidingView
      style={{ flex: 1 }}
      behavior={Platform.OS === 'ios' ? 'padding' : 'height'}
    >
      <ScrollView
        contentContainerStyle={{ flexGrow: 1 }}
        showsVerticalScrollIndicator={false}
      >
        <VStack flex={1}>
          <Image
            w="$full"
            h={624}
            source={BackgroundImg}
            defaultSource={BackgroundImg}
            alt="Pessoas treinando"
            position="absolute"
          />
          <VStack flex={1} px="$10" pb="$16">
            <Center my="$24">
              <Logo />
              <Text color="$gray100" fontSize="$sm">
                Treine sua mente e o seu corpo
              </Text>
            </Center>
            <Center gap="$2">
              <Heading color="$gray100">
                Acesse sua conta
              </Heading>

              <Controller
                control={control}
                name="email"
                render={({ field: { onChange, value } }) => (
                  <Input
                    placeholder="E-mail"
                    keyboardType="email-address"
                    autoCapitalize="none"
                    onChangeText={onChange}
                    value={value}
                    errorMessage={errors.email?.message}
                  />
                )}
              />

              <Controller
                control={control}
                name="password"
                render={({ field: { onChange, value } }) => (
                  <Input
                    placeholder="Senha"
                    secureTextEntry
                    onChangeText={onChange}
                    value={value}
                    errorMessage={errors.password?.message}
                    onSubmitEditing={handleSubmit(handleSignIn)}
                    returnKeyType="send"
                  />
                )}
              />

              <Button title="Acessar" onPress={handleSubmit(handleSignIn)} />
            </Center>
            <Center flex={1} justifyContent="flex-end" mt="$4">
              <Text color="$gray100" fontSize="$sm" mb="$3" fontFamily="$body">
                Ainda não tem acesso?
              </Text>
              <Button title="Criar conta" variant="outline" onPress={handleNewAccount} />
            </Center>
          </VStack>
        </VStack>
      </ScrollView>
    </KeyboardAvoidingView>
  );
}
