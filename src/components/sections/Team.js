import React, { lazy, Suspense, useState, useEffect } from "react";
import styled from "styled-components";
import { useQuery } from "@tanstack/react-query";
import { Link } from "react-router-dom";

const ConfettiComponent = lazy(() => import("../Confetti"));

const Section = styled.section`
  min-height: 100vh;
  width: 100vw;
  background-color: ${(props) => props.theme.body};
  position: relative;
  overflow: hidden;
  background: #0f182e;
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

const SearchInput = styled.input`
  width: 50%;
  padding: 1rem;
  margin: 2rem auto;
  display: block;
  border-radius:20px;
  @media (max-width: 40em) {
    width: 80%;
  }
`;

const Container = styled.div`
  width: 75%;
  margin: 2rem auto;
  display: flex;
  justify-content: space-between;
  align-items: center;
  flex-wrap: wrap;
  
  s @media (max-width: 64em) {
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

  const [searchTerm, setSearchTerm] = useState("");
  const [filteredNfts, setFilteredNfts] = useState([]);

  useEffect(() => {
    if (nfts) {
      const filtered = nfts.filter(
        (nft) =>
          nft.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
          (nft.description &&
            nft.description.toLowerCase().includes(searchTerm.toLowerCase()))
      );
      setFilteredNfts(filtered);
    }
  }, [nfts, searchTerm]);

  const pageSize = 9;
  const [currentPage, setCurrentPage] = useState(1);

  if (isLoading) {
    return <div>Loading...</div>;
  }

  if (isError) {
    return <div>Error: {error.message}</div>;
  }

  console.log(nfts);
  const totalPages = Math.ceil(filteredNfts.length / pageSize);
  const startIndex = (currentPage - 1) * pageSize;
  const endIndex = startIndex + pageSize;
  const currentNfts = filteredNfts.slice(startIndex, endIndex);

  return (
    <Section id="team">
      <Suspense fallback={<div>Loading...</div>}>
        <ConfettiComponent />
      </Suspense>

      <SearchInput
        type="text"
        placeholder="Search by name or description..."
        value={searchTerm}
        onChange={(e) => setSearchTerm(e.target.value)}
      />

      <Container>
        {currentNfts.map((nft) => (
          <Link to={`nft/${nft.token_id}`} key={nft.token_id}>
            <div className="rounded-lg p-[1rem] bg-[#272D37] w-[350px] h-[420px] my-[2rem]">
              <img
                src={nft.image}
                alt=""
                className="object-cover w-full rounded-lg h-[75%]"
              />
              <div className="flex items-center justify-between p-[1rem]">
                <p className="text-white">
                  {nft.name.length > 10
                    ? `${nft.name.substring(0, 20)}...`
                    : nft.name}
                </p>
                <p className="bg-[blue] text-[12px] rounded-md p-[0.5rem]">
                  ETH
                </p>
              </div>
              <div className="text-right text-white mb-[1rem]">
                <p className="text-sm">current bid</p>
                <p className="font-bold">{nft.price * 10000} ETH</p>
              </div>
            </div>
          </Link>
        ))}
      </Container>

      <div className="join absolute right-[10%] bottom-[2%]">
        <button
          disabled={currentPage === 1}
          onClick={() => setCurrentPage(currentPage - 1)}
          className="join-item btn"
        >
          «
        </button>
        <button className="join-item btn">
          Page {currentPage} of {totalPages}
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
