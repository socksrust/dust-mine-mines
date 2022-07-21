import React, { FC, useEffect, useState } from "react";
import styled from "@emotion/styled";
import { useRouter } from "next/router";
import {
  IconButton,
  Menu,
  MenuButton,
  MenuItem,
  MenuList,
  Text,
} from "@chakra-ui/react";
import { Box, Flex } from "@chakra-ui/layout";
import { ConnectWallet } from "../button/connectWallet";
import { motion } from "framer-motion";
import { useScrollFramer } from "../../hooks/useScrollFramer";
import LeftMenu from "../left-menu";
import Space from "../common/space";
import constants from "../../utils/constants";
import { HamburgerIcon } from "@chakra-ui/icons";
import Link from "next/link";

const { objects, colors } = constants;
const { logoUrl } = objects;

const Image = styled.img`
  width: 280px;
  /* margin-left: 20px; */
  /* border-radius: 50%; */
  /* border: 1px solid white; */
  @media (max-width: 750px) {
  }
`;

const MyText = styled(Text)`
  @media (max-width: 750px) {
  }
`;

interface HeaderProps {}

const Header: FC<HeaderProps> = () => {
  const { push } = useRouter();

  const { startedScrolling } = useScrollFramer(0.04);

  if (!window) {
    return null;
  }

  return (
    <>
      <motion.div
        animate={{
          backdropFilter: `blur(${!startedScrolling ? 0 : 10}px)`,
          WebkitBackdropFilter: `blur(${!startedScrolling ? 0 : 10}px)`,
        }}
        style={{
          zIndex: 900,
          //position: 'sticky',
          top: 0,
          left: 0,
          right: 0,
          transition: "0.1s",
        }}
      >
        <Flex
          // p="20px"
          alignItems="center"
          justifyContent="center"
          direction="row"
          bg="#0D1624"
          height="100px"
          position="relative"
        >
          <div
            onClick={() => push("/")}
            width="120px"
            style={{ display: "flex", alignItems: "center", cursor: "pointer" }}
          >
            <Image src={logoUrl} />
            {/* <MyText color={colors.objectText} ml={5} fontSize="24px" fontWeight="bold">{logo}</MyText> */}
          </div>
          <Flex
            direction="column"
            justifyContent="space-between"
            w="100%"
            alignItems="center"
            flexWrap="wrap"
            justifyItems="center"
            style={
              window.innerWidth <= 800
                ? { direction: "initial" }
                : { zIndex: 9 }
            }
          >
            {/* <Space width={30} height={20}/> */}

            <Flex
              direction="row"
              justifyContent="space-between"
              alignItems="center"
              overflow="hidden"
              // flexWrap='wrap'
              // justifyItems='center'
              w="100%"
            >
              <LeftMenu />
            </Flex>
          </Flex>
          <Box display={{ base: "block", md: "none" }} marginRight="15px">
            <Menu>
              <MenuButton
                as={IconButton}
                aria-label="Options"
                icon={<HamburgerIcon />}
                variant="outline"
                color="#fff"
                fontSize="24px"
              />
              <MenuList>
                <ConnectWallet />
                <MenuItem color="#FF0074" fontWeight="bold" onClick={() => push("/")}>
                  Coinflip
                </MenuItem>
                <MenuItem color="#FF0074" fontWeight="bold" onClick={() => push("/dice")}>
                  Dice
                </MenuItem>
                <MenuItem color="#FF0074" fontWeight="bold" onClick={() => push("/roulette")}>
                  Roulette
                </MenuItem>
                <MenuItem color="#FF0074" fontWeight="bold" onClick={() => push("/rps")}>
                  RPS
                </MenuItem>
                <MenuItem color="#FF0074" fontWeight="bold" onClick={() => push("/blackjack")}>
                  Baccarat
                </MenuItem>
                <MenuItem color="#FF0074" fontWeight="bold" onClick={() => push("/mines")}>
                  Mines
                </MenuItem>
                <MenuItem color="#FF0074" fontWeight="bold" onClick={() => push("/balance")}>
                  Balance
                </MenuItem>
                <MenuItem color="#FF0074" fontWeight="bold" onClick={() => push("https://www.iconiclabs.xyz/")}>
                  HUB
                </MenuItem>
                
              </MenuList>
            </Menu>
          </Box>
        </Flex>
      </motion.div>
    </>
  );
};

export default Header;
