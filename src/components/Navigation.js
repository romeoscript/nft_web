import React, { useState, useEffect } from "react";
import styled from "styled-components";
import Button from "./Button";
import { Link, useNavigate } from "react-router-dom";
import Logo from "../assets/logo.svg";

const Section = styled.section`
  width: 100vw;
  background-color: ${(props) => props.theme.body};
`;
const NavBar = styled.nav`
  display: flex;
  justify-content: space-between;
  align-items: center;

  width: 85%;
  height: ${(props) => props.theme.navHeight};
  margin: 0 auto;

  .mobile {
    display: none;
  }

  @media (max-width: 64em) {
    .desktop {
      display: none;
    }
    .mobile {
      display: inline-block;
    }
  }
`;
const Menu = styled.ul`
  display: flex;
  justify-content: space-between;
  align-items: center;
  list-style: none;

  @media (max-width: 64em) {
    /* 1024 px */

    position: fixed;
    top: ${(props) => props.theme.navHeight};
    left: 0;
    right: 0;
    bottom: 0;
    width: 100vw;
    height: ${(props) => `calc(100vh - ${props.theme.navHeight})`};
    z-index: 50;
    background-color: ${(props) => `rgba(${props.theme.bodyRgba},0.85)`};
    backdrop-filter: blur(2px);

    transform: ${(props) =>
      props.click ? "translateY(0)" : `translateY(1000%)`};
    transition: all 0.3s ease;
    flex-direction: column;
    justify-content: center;

    touch-action: none;
  }
`;

const MenuItem = styled.li`
  margin: 0 1rem;
  color: ${(props) => props.theme.text};
  cursor: pointer;

  &::after {
    content: " ";
    display: block;
    width: 0%;
    height: 2px;
    background: ${(props) => props.theme.text};
    transition: width 0.3s ease;
  }
  &:hover::after {
    width: 100%;
  }

  @media (max-width: 64em) {
    margin: 1rem 0;

    &::after {
      display: none;
    }
  }
`;
const HamburgerMenu = styled.span`
  width: ${(props) => (props.click ? "2rem" : "1.5rem")};

  height: 2px;
  background: ${(props) => props.theme.text};

  position: absolute;
  top: 2rem;
  left: 50%;
  transform: ${(props) =>
    props.click
      ? "translateX(-50%) rotate(90deg)"
      : "translateX(-50%) rotate(0)"};

  display: none;
  justify-content: center;
  align-items: center;

  cursor: pointer;
  transition: all 0.3s ease;

  @media (max-width: 64em) {
    /* 1024 px */
    display: flex;
  }

  &::after,
  &::before {
    content: " ";
    width: ${(props) => (props.click ? "1rem" : "1.5rem")};
    height: 2px;
    right: ${(props) => (props.click ? "-2px" : "0")};
    background: ${(props) => props.theme.text};
    position: absolute;
    transition: all 0.3s ease;
  }

  &::after {
    top: ${(props) => (props.click ? "0.3rem" : "0.5rem")};
    transform: ${(props) => (props.click ? "rotate(-40deg)" : "rotate(0)")};
  }
  &::before {
    bottom: ${(props) => (props.click ? "0.3rem" : "0.5rem")};
    transform: ${(props) => (props.click ? "rotate(40deg)" : "rotate(0)")};
  }
`;

const Navigation = () => {
  const [click, setClick] = useState(false);
  const [user, setUser] = useState("");
  const [isLoading, setIsLoading] = useState(true);
  const [error, setError] = useState(null);
  const navigate = useNavigate();

  useEffect(() => {
    const fetchuserINfo = async () => {
      try {
        // Retrieve the access token from local storage
        const accessToken = localStorage.getItem("token");

        // If the token is not found, you can handle it accordingly (e.g., redirect to login)
        if (!accessToken) {
          throw new Error("Access token not found");
        }

        // Set the Authorization header with the bearer token
        const response = await fetch(
          "https://nftapi-production-405a.up.railway.app/userInfo",
          {
            headers: {
              Authorization: `Bearer ${accessToken}`,
            },
          }
        );

        if (!response.ok) {
          throw new Error(`HTTP error! status: ${response.status}`);
        }

        const data = await response.json();
        setUser(data.email.slice(0, 1));
        //console.log(data.email.slice(0,1));
      } catch (e) {
        setError(e.message); // Set any error that occurred
      } finally {
        setIsLoading(false); // Set loading to false when the request is complete
      }
    };

    fetchuserINfo();
  }, []);

  if (isLoading) {
    return <div>Loading...</div>;
  }

  const logout = () => {
    localStorage.removeItem("token");
    navigate("/");
    window.location.reload();
  };

  const scrollTo = (id) => {
    let element = document.getElementById(id);

    element.scrollIntoView({
      behavior: "smooth",
      block: "start",
      inline: "nearest",
    });

    setClick(!click);
  };
  const token = localStorage.getItem("token");
  return (
    <Section id="navigation">
      <NavBar>
        <span className="flex items-center gap-2">
          {" "}
          <img src={Logo} alt="logo" /> <span> Pandas</span>
        </span>

        {!token && (
          <div>
            <HamburgerMenu click={+click} onClick={() => setClick(!click)}>
              &nbsp;
            </HamburgerMenu>
            <Menu click={+click}>
              <MenuItem onClick={() => scrollTo("home")}>Home</MenuItem>
              <MenuItem onClick={() => scrollTo("about")}>About</MenuItem>
              <MenuItem onClick={() => scrollTo("roadmap")}>Roadmap</MenuItem>

              <MenuItem onClick={() => scrollTo("team")}>Team</MenuItem>
              <MenuItem onClick={() => scrollTo("faq")}>Faq</MenuItem>
              <MenuItem>
                <div className="mobile">
                  <Button text="Login" link="/login" />
                </div>
              </MenuItem>
            </Menu>
            <div className="desktop">
              <Button text="Login" link="/login" />
            </div>
          </div>
        )}

        {token && (
          <div className="dropdown dropdown-end z-40">
            <label tabIndex={0} className="btn btn-ghost btn-circle avatar">
              <div className="w-10 rounded-full flex justify-center items-center text-2xl ">
                {user}
                {/* <img src="/images/stock/photo-1534528741775-53994a69daeb.jpg" /> */}
              </div>
            </label>
            <ul
              tabIndex={0}
              className="mt-3 z-[1] p-2 shadow menu menu-sm dropdown-content bg-base-100 rounded-box w-52"
            >
              <li>
                <Link to="/mynft">MyNfts</Link>
              </li>
              <Link to="/create">Create Nfts</Link>

              <li onClick={logout}>
                <a>Logout</a>
              </li>
            </ul>
          </div>
        )}
      </NavBar>
    </Section>
  );
};

export default Navigation;
