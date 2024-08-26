import { Platform, TouchableOpacity } from "react-native";
import { Center, Heading, KeyboardAvoidingView, ScrollView, Text, VStack } from '@gluestack-ui/themed';

import { Button } from "@components/Button";
import { Input } from "@components/Input";
import { ScreenHeader } from "@components/ScreenHeader";
import { UserPhoto } from "@components/UserPhoto";

export function Profile() {
  return (
    <KeyboardAvoidingView
      style={{ flex: 1 }}
      behavior={Platform.OS === 'ios' ? 'padding' : 'height'}
    >
      <VStack flex={1}>
        <ScreenHeader title='Perfil' />
        <ScrollView contentContainerStyle={{ paddingBottom: 36 }}>
          <Center mt="$6" px="$10">
            <UserPhoto
              source={{ uri: 'https://github.com/thalisson-danelon.png' }}
              alt="Imagem do usuário"
              size="xl"
            />

            <TouchableOpacity>
              <Text
                color="$green500"
                fontFamily="$heading"
                fontSize="$md"
                mt="$2"
                mb="$8"
              >
                Alterar imagem
              </Text>
            </TouchableOpacity>

            <Center>
              <Input placeholder="Nome" bg="$gray600" />
              <Input value="teste@email.com" bg="$gray600" isReadOnly />
            </Center>

            <Heading
              alignSelf="flex-start"
              fontFamily="$heading"
              color="$gray200"
              fontSize="$md"
              mt="$12"
              mb="$2"
            >
              Alterar senha
            </Heading>

            <Center w="$full" gap="$4">
              <Input placeholder="Senha antiga" bg="$gray600" secureTextEntry />
              <Input placeholder="Nova senha" bg="$gray600" secureTextEntry />
              <Input placeholder="confirme a nova senha" bg="$gray600" secureTextEntry />
              <Button title="Atualizar" />
            </Center>
          </Center>
        </ScrollView>
      </VStack>
    </KeyboardAvoidingView>
  );
}
