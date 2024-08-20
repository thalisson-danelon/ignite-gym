import { ComponentProps } from 'react';

import { Button as GSButton, ButtonSpinner, Text } from '@gluestack-ui/themed';

type Props = ComponentProps<typeof GSButton> & {
  title: string;
  isLoading?: boolean;
}

export function Button({ title, isLoading = false, ...rest }: Props) {
  return (
    <GSButton
      w="$full"
      h="$14"
      bg="$green700"
      borderWidth="$0"
      borderColor="$green500"
      rounded="$sm"
      $active-bg="$green500"
      disabled={isLoading}
      {...rest}
    >
      {isLoading ? (
        <ButtonSpinner color="$white" />
      ) : (
        <Text color="$white" fontFamily="$heading" fontSize="$sm">
          {title}
        </Text>
      )}
    </GSButton>
  );
}
