import { useState, useEffect } from "react";
import {
  Button,
  ButtonGroup,
  Heading,
  Text,
  Flex,
  useToast,
} from "@chakra-ui/react";

function Buy({ connectedContract }) {
  const toast = useToast();
  const [totalTicketCount, setTotalTicketCount] = useState(null);

  const [awailableTicketCount, setAvailableTicketCount] = useState(null);

  const [buyTxnPending, setBuyTxnPending] = useState(false);

  useEffect(() => {
    if (!connectedContract) return;

    getAvailableTicketCount();
    getTotalTicketCount();
  });

  const buyTicket = async () => {
    try {
      if (!connectedContract) return;

      setBuyTxnPending(true);
      const buyTxn = await connectedContract.mint({
        value: `${8000}`,
      });

      await buyTxn.wait();
      setBuyTxnPending(false);
      toast({
        title: "Success!",
        description: (
          <a
            href={`https://rinkeby.etherscan.io/tx/${buyTxn.hash}`}
            target="_blank"
            rel="nofollow noreferrer"
          >
            Checkout the transaction on Etherscan
          </a>
        ),
        status: "success",
        variant: "subtle",
      });
    } catch (err) {
      console.error(err);
      setBuyTxnPending(false);

      toast({
        title: "Failed.",
        description: err,
        status: "error",
        variant: "subtle",
      });
    }
  };

  const getAvailableTicketCount = async () => {
    try {
      if (!connectedContract) return;

      const count = await connectedContract.AvailableTicketsCount();
      setAvailableTicketCount(count.toNumber());
    } catch (err) {
      console.error(err);
    }
  };

  const getTotalTicketCount = async () => {
    try {
      if (!connectedContract) return;

      const count = await connectedContract.TotalTicketsCount();
      setTotalTicketCount(count.toNumber());
    } catch (err) {
      console.error(err);
    }
  };

  return (
    <>
      <Heading mb={4}>DevDAO Conference 2022</Heading>
      <Text fontSize="xl" mb={4}>
        Connect your wallet to mint your NFT. It'll be your ticket to get in!
      </Text>
      <Flex
        flexDirection="column"
        alignItems="center"
        justifyContent="center"
        margin="0 auto"
        maxW="140px"
      >
        <ButtonGroup mb={4}>
          <Button
            onClick={buyTicket}
            isLoading={buyTxnPending}
            loadingText="Pending"
            size="lg"
            colorScheme="teal"
          >
            Buy Ticket
          </Button>
        </ButtonGroup>
        {awailableTicketCount && totalTicketCount && (
          <Text>
            {awailableTicketCount} of {totalTicketCount} minted!
          </Text>
        )}
      </Flex>
    </>
  );
}

export default Buy;
