import React from "react";
import { GridItem, Link, Center, Image, Text } from "@chakra-ui/react";
import { ProtocolDataType } from "@/types";

interface Params extends ProtocolDataType {
  href: string;
}

export const ProtocolInteractItem = ({ name, url, href }: Params) => {
  return (
    <GridItem
      border="4px solid"
      w="14rem"
      borderColor={"blue.500"}
      bg={"white"}
      color={"black"}
      _hover={{
        cursor: "pointer",
        bgColor: "white",
        borderColor: "gray.400",
      }}
      rounded="lg"
    >
      <Link href={href}>
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
        </Center>
      </Link>
    </GridItem>
  );
};
