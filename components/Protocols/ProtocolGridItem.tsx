import React from "react";
import { GridItem, Link, Center, Image, Text } from "@chakra-ui/react";
import { ProtocolDataType } from "@/types";

interface Params extends ProtocolDataType {
  isSelected: boolean;
  score: number;
  onClick: () => void;
}

export const ProtocolGridItem = ({
  name,
  url,
  isSelected,
  score,
  onClick,
}: Params) => {
  return (
    <GridItem
      border="2px solid"
      borderColor={"gray.500"}
      bg={isSelected ? "blue.700" : "white"}
      color={isSelected ? "white" : "black"}
      _hover={{
        cursor: "pointer",
        bgColor: isSelected ? "blue.800" : "whiteAlpha.700",
        borderColor: "gray.400",
      }}
      rounded="lg"
      onClick={onClick}
    >
      <Center flexDir={"column"} h="100%" p="1rem">
        <Image
          bg="white"
          w="2rem"
          src={`https://t2.gstatic.com/faviconV2?client=SOCIAL&type=FAVICON&fallback_opts=TYPE,SIZE,URL&size=128&url=${url}`}
          alt={name}
          borderRadius="full"
        />
        <Text mt="0.5rem" textAlign={"center"}>
          {name}
        </Text>
        <Center mt={2} fontSize={"sm"}>
          <Text
            color={isSelected ? "white" : "blue.700"}
            fontWeight={"semibold"}
          >
            Score: {score}
          </Text>
        </Center>
      </Center>
    </GridItem>
  );
};
