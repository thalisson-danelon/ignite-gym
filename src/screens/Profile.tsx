import { Platform, TouchableOpacity } from "react-native";
import { Center, Heading, KeyboardAvoidingView, ScrollView, Text, useToast, VStack } from '@gluestack-ui/themed';
import * as ImagePicker from 'expo-image-picker';
import * as FileSystem from 'expo-file-system';

import { Button } from "@components/Button";
import { Input } from "@components/Input";
import { ScreenHeader } from "@components/ScreenHeader";
import { UserPhoto } from "@components/UserPhoto";
import { useState } from "react";
import { ToastMessage } from "@components/ToastMessage";

export function Profile() {
  const [userPhoto, setUserPhoto] = useState('https://github.com/thalisson-danelon.png')
  const toast = useToast();

  async function handleUserPhotoSelect() {
    try {
      const photoSelected = await ImagePicker.launchImageLibraryAsync({
        mediaTypes: ImagePicker.MediaTypeOptions.Images,
        quality: 1,
        aspect: [4, 4],
        allowsEditing: true,
      });
      if (photoSelected.canceled) return;
      const photoUri = photoSelected.assets[0].uri;
      if (!photoUri) return;
      const photoInfo = (await FileSystem.getInfoAsync(photoUri)) as { size: number };
      if (photoInfo.size / 1024 / 1024 > 5) {
        return toast.show({
          placement: 'top',
          render: ({ id }) =>
            <ToastMessage
              id={id}
              action='error'
              title="Imagem muito grande"
              description="Escolha uma imagem de até 5MB"
              onClose={() => toast.close(id)}
            />
        })
      }
      setUserPhoto(photoUri);
    } catch (error) {
      console.log(error);
    }
  }

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
              source={{ uri: userPhoto }}
              alt="Imagem do usuário"
              size="xl"
              onPress={() => handleUserPhotoSelect()}
            />

            <TouchableOpacity>
              <Text
                color="$green500"
                fontFamily="$heading"
                fontSize="$md"
                mt="$2"
                mb="$8"
                onPress={handleUserPhotoSelect}
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
