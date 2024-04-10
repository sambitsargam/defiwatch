"use client";

import React, { useEffect, useState } from "react";
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
} from "@chakra-ui/react";
import {
  erc20ABI,
  useContractRead,
  useAccount,
  useChainId,
  usePrepareContractWrite,
  useContractWrite,
} from "wagmi";
import { formatEther, maxUint256, parseEther } from "viem";
import MasterLayout from "@/components/MasterLayout";
import { ChevronLeftIcon } from "@chakra-ui/icons";
import Link from "next/link";
import { DarkButton } from "@/components/DarkButton";
import { aTokenABI } from "@/abi/aToken";
import { chainIdToAddresses } from "@/constants";

const Aave = () => {
  const { address } = useAccount();
  const chainId = useChainId();

  const [balanceInETH, setBalanceInETH] = useState<string>("0");
  const [amountInETH, setAmountInETH] = useState<string>();

  const { data: daiBalance } = useContractRead({
    address: chainIdToAddresses[chainId].DAI,
    abi: erc20ABI,
    functionName: "balanceOf",
    args: [address!],
    enabled: !!address,
  });

  const { data: daiAllowance, refetch: refetchAllowance } = useContractRead({
    address: chainIdToAddresses[chainId].DAI,
    abi: erc20ABI,
    functionName: "allowance",
    args: [address!, chainIdToAddresses[chainId].aDAI],
    enabled: !!address,
    watch: true,
  });

  const { config: approveConfig } = usePrepareContractWrite({
    address: chainIdToAddresses[chainId].DAI,
    abi: erc20ABI,
    functionName: "approve",
    args: [chainIdToAddresses[chainId].aDAI, maxUint256],
    enabled: !!address && !daiAllowance,
    onSuccess: () => {
      refetchAllowance();
    },
  });

  const { config: mintConfig } = usePrepareContractWrite({
    address: chainIdToAddresses[chainId].aDAI,
    abi: aTokenABI,
    functionName: "mint",
    args: [parseEther(amountInETH ?? "0"), address!],
    enabled: !!address && !!amountInETH && !!daiAllowance,
  });

  const { write: approve, isLoading: isApproveLoading } =
    useContractWrite(approveConfig);
  const { write: mint, isLoading: isMintLoading } =
    useContractWrite(mintConfig);

  useEffect(() => {
    if (daiBalance) {
      setBalanceInETH(formatEther(daiBalance));
    }
  }, [daiBalance]);

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
          <Heading>Aave</Heading>
          <Spacer />
        </Flex>
        <FormControl mt={14}>
          <Flex>
            <FormLabel>Amount to deposit</FormLabel>
            <Spacer />
            <HStack
              fontSize={"sm"}
              cursor="pointer"
              onClick={() => setAmountInETH(balanceInETH)}
            >
              <Text>Balance: </Text>
              <Text
                _hover={{
                  color: "blue.300",
                }}
              >
                {balanceInETH}
              </Text>
            </HStack>
          </Flex>
          <Input
            type="number"
            value={amountInETH}
            onChange={(e) => setAmountInETH(e.target.value)}
          />
        </FormControl>
        <Center mt={4}>
          <HStack spacing={4}>
            {(daiAllowance === undefined || !daiAllowance) && (
              <DarkButton
                isLoading={isApproveLoading}
                isDisabled={!approve}
                onClick={() => approve?.()}
              >
                1. Approve
              </DarkButton>
            )}
            <DarkButton
              isLoading={isMintLoading}
              isDisabled={!mint}
              onClick={() => mint?.()}
            >
              {daiAllowance === undefined || !daiAllowance ? "2." : ""} Deposit
            </DarkButton>
          </HStack>
        </Center>
      </Container>
    </MasterLayout>
  );
};

export default Aave;
