import React, { useEffect } from "react";
import { Box } from "@material-ui/core";
import { Button } from '@chakra-ui/react';
import constants from '../../../utils/constants';
import {
  Text,
} from '@chakra-ui/react';
const { colors, infos, objects: { coins } } = constants;
const { primaryBackground, secondaryBackground, objectBackground, objectText, buttonText } = colors;

export default function BlackJackButtons({isPaymentVerified, ...props}) {
  useEffect(() => {
    function click(event) {
      switch (event.key) {
        case "h":
          props.onClickHit();
          break;
        case "s":
          props.onClickStand();
          break;
        default:
          break;
      }
    }

    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  return (
    <Box display="flex" flexDirection="row" justifyContent="center" mt={1}>
      <Box mx={1}>
        <Button backgroundColor={objectBackground} onClick={props.onClickHit} isDisabled={!isPaymentVerified}>
          <Text fontSize="14px" fontWeight="bold" color={buttonText}>HIT</Text>
        </Button>
      </Box>
      <Box mx={1}>
        <Button backgroundColor={objectBackground} onClick={props.onClickStand} isDisabled={!isPaymentVerified}>
          <Text fontSize="14px" fontWeight="bold" color={buttonText}>STAND</Text>
        </Button>
      </Box>
    </Box>
  );
}
