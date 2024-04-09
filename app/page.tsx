"use client";

import {
  Box,
  Center,
  Heading,
  SimpleGrid,
  Image,
  HStack,
} from "@chakra-ui/react";
import MasterLayout from "@/components/MasterLayout";
import { ProtocolGridBase } from "@/components/Protocols/ProtocolGridBase";
import { protocols } from "@/data/protocols";
import { ProtocolInteractItem } from "@/components/Protocols/ProtocolInteractItem";

export const runtime = "nodejs";

export default function Home() {
  return (
    <MasterLayout hideConnectWalletBtn={false}>
      <HStack>
        <Center flexDir={"column"} mt={"3rem"} px="7rem">
          <ProtocolGridBase protocolsData={protocols} />
          <Box mt={12}>
            <Heading fontSize={"2xl"}>Interact with Protocols:</Heading>
            <SimpleGrid mt={2} columns={2} gap={6}>
              <ProtocolInteractItem
                name="Aave"
                url="https://aave.com"
                href="/aave"
              />
              <ProtocolInteractItem
                name="Uniswap"
                url="https://uniswap.org"
                href="/uniswap"
              />
            </SimpleGrid>
          </Box>
        </Center>
        <Box>
          <Center pt="8">
            <Image w="16rem" src="/nft.svg" alt="logo"/>
          </Center>
        </Box>
      </HStack>
    </MasterLayout>
  );
}
