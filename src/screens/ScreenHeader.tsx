import { Center, Heading, HStack } from "@gluestack-ui/themed";

type Props = {
  title: string
}

export function ScreenHeader({ title }: Props) {
  return (
    <HStack flex={1} width="100%">
      <Center flex={1} bg="$gray600" pb="$6" pt="$16">
        <Heading color="$gray100" fontSize="$xl" fontFamily="$heading">{title}</Heading>
      </Center>
    </HStack>
  )
}
