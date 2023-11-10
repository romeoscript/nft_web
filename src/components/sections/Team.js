import React, { lazy, Suspense, useState } from "react";
import styled from "styled-components";
import { useQuery } from "@tanstack/react-query";
import Loading from "../Loading";
import NftItem from "./NFT";
import { Link } from "react-router-dom";

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
    justify-content: space-around;
  }
`;

const fetchNFTs = async () => {
  const response = await fetch(
    "https://nftapi-production-405a.up.railway.app/nft"
  );
  if (!response.ok) {
    throw new Error("Network response was not ok");
  }
  return response.json();
};

const Team = () => {
  const {
    data: nfts,
    error,
    isError,
    isLoading,
  } = useQuery({
    queryFn: () => fetchNFTs(),
    queryKey: ["nfts"],
    cacheTime: 1000 * 60 * 5, // cache data for 5 minutes
    staleTime: 1000 * 60,
  });
  const pageSize = 9;
  const [currentPage, setCurrentPage] = useState(1);

  if (isLoading) {
    return <div>Loading...</div>;
  }

  if (isError) {
    return <div>Error: {error.message}</div>;
  }

  console.log(nfts);
  const totalPages = Math.ceil(nfts.length / pageSize);
  const startIndex = (currentPage - 1) * pageSize;
  const endIndex = startIndex + pageSize - 1;
  const currentNfts = nfts.slice(startIndex, endIndex + 1);
  return (
    <Section id="team">
      <Suspense fallback={<Loading />}>
        <ConfettiComponent />{" "}
      </Suspense>
      <Title>Team</Title>

      <section className="grid md:grid-cols-3 place-items-center">
        {currentNfts.map((nft) => {
          return (
            <Link to={`nft/${nft.token_id}`} key={nft.token_id}>
              <div className="rounded-lg p-[1rem] bg-[#272D37] w-[350px] h-[420px] my-[2rem]">
                <img
                  src={nft.image}
                  alt=""
                  className="object-cover w-full rounded-lg h-[75%]"
                />
                <div className="flex items-center justify-between p-[1rem]">
                  <p className="text-white">
                    {" "}
                    {nft.name.length > 10 ? `${nft.name.substring(0, 20)}...` : nft.name} <span></span>
                  </p>
                  <p className="bg-[blue] text-[12px] rounded-md p-[0.5rem]">
                    ETH
                  </p>
                </div>
                <div className="text-right text-white mb-[1rem]">
                  <p className="text-sm">
                    {" "}
                    current bid <span></span>
                  </p>
                  <p className=" font-bold">
                    {" "}
                    {nft.price*10000} ETH
                  </p>
                </div>
              </div>
            </Link>
          );
        })}
      </section>
      {/* <Container>
        {currentNfts.map((nft) => {
          return (
            <Link to={`nft/${nft.token_id}`}>
              <NftItem
                key={nft.token_id}
                img={nft.image}
                number={nft.token_id.substring(0, 5)}
                price={nft.price * 100000}
                name={nft.name}
              />
            </Link>
          );
        })}
      </Container> */}
      <br />
      <br />
      <br />

      <div className="join absolute right-[10%] bottom-[2%]">
        <button
          disabled={currentPage === 1}
          onClick={() => setCurrentPage(currentPage - 1)}
          className="join-item btn"
        >
          «
        </button>
        <button className="join-item btn">
          {" "}
          Page {currentPage} of {totalPages}{" "}
        </button>
        <button
          disabled={currentPage === totalPages}
          onClick={() => setCurrentPage(currentPage + 1)}
          className="join-item btn"
        >
          »
        </button>
      </div>
    </Section>
  );
};

export default Team;
