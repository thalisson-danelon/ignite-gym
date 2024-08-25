import { VStack } from '@gluestack-ui/themed';

import { ScreenHeader } from "@components/ScreenHeader";
import { HistoryCard } from "@components/HistoryCard";

export function History() {
  return (
    <VStack>
      <ScreenHeader title="Histórico" />
      <HistoryCard />
    </VStack>
  );
}
