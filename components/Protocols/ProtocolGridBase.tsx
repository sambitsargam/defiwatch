import { useState, useEffect } from "react";
import { Box, Center, HStack, SimpleGrid, Text } from "@chakra-ui/react";
import { ProtocolDataType } from "@/types";
import { ProtocolGridItem } from "./ProtocolGridItem";

interface Params {
  protocolsData: ProtocolDataType[];
}

const creditScores = [452, 720, 540, 836];

export const ProtocolGridBase = ({ protocolsData }: Params) => {
  const [selectedIds, setSelectedIds] = useState<number[]>([]);
  const [credenceScore, setCredenceScore] = useState<number>();

  useEffect(() => {
    if (selectedIds.length === 0) {
      setCredenceScore(undefined);
    } else {
      setCredenceScore(
        selectedIds.reduce((acc, id) => acc + creditScores[id], 0) /
          selectedIds.length
      );
    }
  }, [selectedIds]);

  return (
    <Box
      px="1rem"
      overflow="scroll"
      overflowX="auto"
      overflowY="auto"
      sx={{
        "::-webkit-scrollbar": {
          w: "10px",
        },
        "::-webkit-scrollbar-track ": {
          bg: "gray.700",
          rounded: "lg",
        },
        "::-webkit-scrollbar-thumb": {
          bg: "gray.600",
          rounded: "lg",
        },
      }} 
    >
      <Center>
        <HStack fontWeight={"bold"}>
          <Text>Your Defi Watch Score:</Text>
          {credenceScore === undefined ? (
            <Text color="whiteAlpha.600">[select protocols below]</Text>
          ) : (
            <Text color={"blue.400"} fontWeight={"bold"}>
              {credenceScore}
            </Text>
          )}
        </HStack>
      </Center>
      <SimpleGrid mt={12} columns={{ base: 2, md: 3, lg: 4 }} gap={6}>
        {protocolsData.map((p, i) => (
          <ProtocolGridItem
            key={i}
            name={p.name}
            url={p.url}
            isSelected={selectedIds.includes(i)}
            score={creditScores[i]}
            onClick={() =>
              setSelectedIds((s) => {
                if (s.includes(i)) {
                  return s.filter((x) => x !== i);
                } else {
                  return [...s, i];
                }
              })
            }
          />
        ))}
      </SimpleGrid>
    </Box>
  );
};
