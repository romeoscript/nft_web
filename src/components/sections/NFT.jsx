import styled from "styled-components";
import ETH from "../../assets/icons8-ethereum-48.png";


const ImgContainer = styled.div`
  width: 15rem;
  height: 500px
  margin: 2rem 1rem;
  background-color: ${(props) => props.theme.body};
  background-color: ${(props) => props.theme.text};
  border-radius: 20px;
  cursor: pointer;
  margin: 1.4rem 0;

  @media (max-width: 48em) {
    width: 12rem;
  }
  @media (max-width: 30em) {
    width: 10rem;
  }

  img {
    width: 100%;
    height: 240px;
    border-radius:20px;
    
   
  }
`;

const Details = styled.div`
  display: flex;
  justify-content: space-between;
  padding: 0.8rem 1rem;
  background-color: ${(props) => props.theme.text};
  border: 2px solid ${(props) => `rgba(${props.theme.bodyRgba},0.5)`};

  border-bottom-left-radius: 20px;
  border-bottom-right-radius: 20px;

  span {
    font-size: ${(props) => props.theme.fontsm};
    color: ${(props) => `rgba(${props.theme.bodyRgba},0.5)`};
    font-weight: 600;
    line-height: 1.5rem;
  }

  h1 {
    font-size: ${(props) => props.theme.fontmd};
    color: ${(props) => props.theme.body};
    font-weight: 600;

    @media (max-width: 30em) {
      font-size: ${(props) => props.theme.fontsm};
    }
  }
`;

const Price = styled.div`
  display: flex;
  justify-content: flex-start;
  align-items: center;

  img {
    width: 1rem;
    height: auto;
  }
`;




const NftItem = ({ img, name, number = 0, price = 0 }) => {
    const truncate = (str, length) => {
        if (str.length > length) {
          return str.slice(0, length) + '...';
        }
        return str;
      };
      
    return (
      <ImgContainer>
        <img  className='object-cover h-full w-[2px]' src={img} alt="The Pandas" />
        <Details>
          <div>
            <span>{truncate(name, 6)}</span> <br />
            <h1>#{number}</h1>
          </div>
  
          <div>
            <span>Price</span>
            <Price>
              <img width={200} height={200} src={ETH} alt="ETH" />
              <h1>{Number(price.toFixed(6))}</h1>
            </Price>
          </div>
        </Details>
      </ImgContainer>
    );
  };

  export default NftItem