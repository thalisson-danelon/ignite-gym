import { Image } from '@gluestack-ui/themed';
import { ComponentProps } from "react";
import { TouchableOpacity } from "react-native";

type Props = ComponentProps<typeof Image> & {
  onPress?: () => void;
}

export function UserPhoto({ onPress, ...rest }: Props) {
  return (
    <TouchableOpacity onPress={onPress}>
      <Image
        rounded="$full"
        borderWidth="$2"
        borderColor="$gray400"
        backgroundColor="$gray500"
        {...rest}
      />
    </TouchableOpacity>
  )
}
