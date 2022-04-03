import styled from "styled-components";

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

    img {
        width: 50px;
        height: 50px;
        object-fit: cover;
        border-radius: 50%;
        border: solid #fff 2px;
        cursor: pointer;
    }
`

const Logo = styled.p`
    font-family: 'Playball', cursive;
    color: #fff;
    font-size: 39px;
`

export {
    Head,
    Logo,
}
