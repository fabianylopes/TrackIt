import styled from "styled-components";
import { useContext } from 'react';
import UserContext from "../contexts/UserContext";

export default function Header() {
    const { token } = useContext(UserContext);

  return (
    <Head>
        <Logo>TrackIt</Logo>
        <Image src={token.image}></Image>
    </Head>
  );
}

const Head = styled.div`
    width: 375px;
    height: 70px;
    padding-left: 18px;
    padding-right: 18px;
    background-color: #126BA5;
    box-shadow: 0px 4px 4px rgba(0, 0, 0, 0.15);
    position: fixed;
    top: 0;
    display: flex;
    align-items: center;
    justify-content: space-between;
`

const Logo = styled.p`
    font-family: 'Playball', cursive;
    color: #fff;
    font-size: 39px;
`

const Image = styled.img`
    width: 50px;
    height: 50px;
    object-fit: cover;
    border-radius: 50%;
`
