import { Button, Box, Flex } from "@chakra-ui/react";
import { useNavigate } from "react-router-dom";

function Connect({ address, onConnect, onDisconnect }) {
  const navigate = useNavigate();
  const connectWallet = async () => {
    const { ethereum } = window;
    if (!ethereum) return;

    try {
      const accounts = await ethereum.request({
        method: "eth_requestAccounts",
      });
      console.log(accounts[0]);
      onConnect(accounts[0]);
    } catch (error) {
      console.log(error);
    }
  };

  const disconnectWallet = async () => {
    onDisconnect();
    navigate("/");
  };

  return (
    <Flex
      fontWeight="bold"
      position="absolute"
      top="8px"
      right="8px"
      zIndex="10"
    >
      {address && (
        <Box
          bg="white"
          minW="120px"
          p="8px 16px"
          borderRadius="16px"
          textAlign="center"
        >
          <Button
            onClick={disconnectWallet}
            size="sm"
            variant="link"
            color="purple"
          >
            Disconnet
          </Button>
        </Box>
      )}
      <Box
        bg="white"
        minW="120px"
        p="8px 16px"
        borderRadius="16px"
        textAlign="center"
      >
        {!address && (
          <Button
            onClick={connectWallet}
            size="sm"
            variant="link"
            color="purple"
          >
            Connect
          </Button>
        )}
        {address && (
          <span>
            {address.slice(0, 6)}
            ...{address.slice(-4)}
          </span>
        )}
      </Box>
    </Flex>
  );
}

export default Connect;
