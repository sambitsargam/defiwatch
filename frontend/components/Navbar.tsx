import { useRouter } from "next/navigation";
import { Center, Flex, Heading, Spacer, Button } from "@chakra-ui/react";
import { ConnectButton } from "@/components/ConnectButton";
import { useAccount } from "wagmi";
import { DarkButton } from "./DarkButton";

export default function Navbar({
  hideConnectWalletBtn,
}: {
  hideConnectWalletBtn?: boolean;
}) {
  const router = useRouter();

  const { isConnected } = useAccount();

  return (
    <Flex
      pt={"10"}
      pr={"1rem"}
      pb={4}
      borderBottom="1px"
      borderColor={"brand.greenLight"}
    >
      <Spacer />
      <Center flex="1" flexDir={"column"}>
        <Heading
          cursor={"pointer"}
          onClick={() => {
            router.push("/");
          }}
        >
          DeFi Watch
        </Heading>
      </Center>
      <Center flex="1" justifyContent={"end"}>
        <Button
          style={{color: 'red' }}
          cursor={"pointer"}
          onClick={() => {
            router.push("/wallet");
          }}
        >
          Portfolio
        </Button>
      </Center>

      <Center flex="1" justifyContent={"end"}>
        {hideConnectWalletBtn ? (
          isConnected ? (
            <ConnectButton />
          ) : (
            ""
          )
        ) : (
          <ConnectButton />
        )}
      </Center>
    </Flex>
  );
}
