import React from 'react';
import { Platform } from 'react-native';
import { Controller, useForm } from "react-hook-form";
import { useNavigation } from '@react-navigation/native';
import { Center, Heading, Image, KeyboardAvoidingView, ScrollView, Text, VStack, } from '@gluestack-ui/themed';
import { yupResolver } from "@hookform/resolvers/yup";
import * as yup from 'yup';

import { AuthNavigatorRoutesProps } from '@routes/auth.routes';
import BackgroundImg from '@assets/background.png';

import Logo from '@assets/logo.svg';
import { Input } from '@components/Input';
import { Button } from '@components/Button';

type FormDataProps = {
  name: string;
  email: string;
  password: string;
  password_confirm: string;
}

const EMAIL_REGX = /^[a-zA-Z0-9_\-]+(\.[a-zA-Z0-9_\-]+)*@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.)|(([a-zA-Z0-9\-]+\.)+))([a-zA-Z]{2,4}|[0-9]{1,3})$/i;

const signUpSchema = yup.object({
  name: yup.string().required('Informe o nome'),
  email: yup.string().required('Informe o e-mail').matches(EMAIL_REGX, 'E-mail inválido'),
  password: yup.string().required('Informe a senha').min(6, 'A senha precisa ter pelo menos 6 dígitos'),
  password_confirm: yup.string().required('Confirme a senha').oneOf([
    yup.ref('password'),
    ""
  ], "As senhas precisam ser iguais"),
});

export function SignUp() {
  const navigation = useNavigation<AuthNavigatorRoutesProps>();
  const { control, handleSubmit, formState: { errors } } = useForm<FormDataProps>({
    resolver: yupResolver(signUpSchema)
  });

  function handleGoBack() {
    navigation.goBack();
  }

  function handleSignUp({ name, email, password, password_confirm }: FormDataProps) {
    console.log({ name, email, password, password_confirm });
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
            <Center gap="$2" flex={1}>
              <Heading color="$gray100">Crie sua conta</Heading>

              <Controller
                control={control}
                name="name"
                render={({ field: { onChange, value } }) => (
                  <Input
                    placeholder="Nome"
                    onChangeText={onChange}
                    value={value}
                    errorMessage={errors.name?.message}
                  />
                )}
              />

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
                  />
                )}
              />
              <Controller
                control={control}
                name="password_confirm"
                render={({ field: { onChange, value } }) => (
                  <Input
                    placeholder="Confirmar Senha"
                    secureTextEntry
                    onChangeText={onChange}
                    value={value}
                    onSubmitEditing={handleSubmit(handleSignUp)}
                    returnKeyType="send"
                    errorMessage={errors.password_confirm?.message}
                  />
                )}
              />

              <Button title="Criar e acessar" onPress={handleSubmit(handleSignUp)} />
            </Center>
            <Button title="Voltar para o login" variant="outline" mt="$12" onPress={handleGoBack} />
          </VStack>
        </VStack>
      </ScrollView>
    </KeyboardAvoidingView>
  );
}
