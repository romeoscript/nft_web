import React, { lazy, Suspense } from "react";
import styled from "styled-components";

import img1 from "../../assets/Nfts/bighead.svg";
import Loading from "../Loading";
import NftItem from "./NFT";

const ConfettiComponent = lazy(() => import("../Confetti"));

const Section = styled.section`
  min-height: 100vh;
  width: 100vw;
  background-color: ${(props) => props.theme.body};
  background-color: ${(props) => props.theme.text};
  position: relative;
  overflow: hidden;
`;
const Title = styled.h1`
  font-size: ${(props) => props.theme.fontxxl};
  text-transform: capitalize;
  color: ${(props) => props.theme.text};
  display: flex;
  justify-content: center;
  align-items: center;
  margin: 1rem auto;
  border-bottom: 2px solid ${(props) => props.theme.text};
  width: fit-content;

  @media (max-width: 40em) {
    font-size: ${(props) => props.theme.fontxl};
  }
`;

const Container = styled.div`
  width: 75%;
  margin: 2rem auto;

  display: flex;
  justify-content: space-between;
  align-items: center;
  flex-wrap: wrap;

  @media (max-width: 64em) {
    width: 80%;
  }
  @media (max-width: 48em) {
    width: 90%;
    justify-content: center;
  }
`;




const Team = () => {
  return (
    <Section id="team">
      <Suspense fallback={<Loading />}>
        <ConfettiComponent />{" "}
      </Suspense>
      <Title>Team</Title>
      <Container>
        <NftItem img={img1} number={852} price={1} />
        <NftItem img={img1} number={852} price={1} />
        <NftItem img={img1} number={852} price={1} />
        <NftItem img={img1} number={852} price={1} />
        <NftItem img={img1} number={852} price={1} />
        <NftItem img={img1} number={852} price={1} />
        <NftItem img={img1} number={852} price={1} />
      </Container>
    </Section>
  );
};

export default Team;
