"use client";

import React, { useState } from "react";
import {
  Box,
  Container,
  FormControl,
  FormLabel,
  Heading,
  Input,
  Center,
  HStack,
  Spacer,
  Text,
  Flex,
  Button,
  InputGroup,
  InputRightElement,
  InputRightAddon,
} from "@chakra-ui/react";
import MasterLayout from "@/components/MasterLayout";
import { ChevronDownIcon, ChevronLeftIcon } from "@chakra-ui/icons";
import Link from "next/link";
import { DarkButton } from "@/components/DarkButton";

const Uniswap = () => {
  const [balance, setBalance] = useState<string>("0");
  const [amount, setAmount] = useState<string>();
  const [outputAmt, setOutputAmt] = useState<string>();

  return (
    <MasterLayout hideConnectWalletBtn={false}>
      <Container mt={10}>
        <Flex>
          <Text flex="1">
            <Button>
              <Link
                href="/"
                style={{
                  textDecoration: "none",
                }}
              >
                <ChevronLeftIcon />
              </Link>
            </Button>
          </Text>
          <Heading>Uniswap</Heading>
          <Spacer />
        </Flex>
        <FormControl mt={14}>
          <Flex>
            <FormLabel>Amount to swap</FormLabel>
            <Spacer />
            <HStack fontSize={"sm"} cursor="pointer">
              <Text>Balance: </Text>
              <Text
                _hover={{
                  color: "blue.300",
                }}
              >
                {balance}
              </Text>
            </HStack>
          </Flex>
          <InputGroup>
            <Input
              type="number"
              value={amount}
              onChange={(e) => setAmount(e.target.value)}
            />
            <InputRightAddon minW="5rem">
              <Center>ETH</Center>
            </InputRightAddon>
          </InputGroup>
        </FormControl>
        <Center py={4}>
          <Button>
            <ChevronDownIcon />
          </Button>
        </Center>
        <FormControl>
          <FormLabel>Amount to receive</FormLabel>
          <InputGroup>
            <Input type="number" value={outputAmt} isReadOnly />
            <InputRightAddon minW="5rem">
              <Center>USDC</Center>
            </InputRightAddon>
          </InputGroup>
        </FormControl>
        <Center mt={4}>
          <DarkButton>Swap</DarkButton>
        </Center>
      </Container>
    </MasterLayout>
  );
};

export default Uniswap;
