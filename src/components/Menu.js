
import styled from "styled-components";
import { Link } from "react-router-dom";
import { CircularProgressbar, buildStyles } from "react-circular-progressbar";
import "react-circular-progressbar/dist/styles.css";

export default function Menu() {

    const percentage = 67;

  return (
    <MenuBar>
        <Link to="/habitos">
            <Button>Hábitos</Button>
        </Link>

        <Hoje>
            <Link to="/today">
                <CircularProgressbar
                value={percentage}
                text={"Hoje"}
                background
                backgroundPadding={4}
                styles={buildStyles({
                    backgroundColor: "#52B6FF",
                    textColor: "#fff",
                    pathColor: "#fff",
                    trailColor: "transparent"
                })}
                />
            </Link>
        </Hoje>

        <Link to="/historico">
            <Button>Histórico</Button>
        </Link>
    </MenuBar>
  );
}

const MenuBar = styled.div`
    width: 375px;
    height: 70px;
    background-color: #fff;
    padding-left: 30px;
    padding-right: 30px;
    position: fixed;
    bottom: 0;
    display: flex;
    justify-content: space-between;
    align-items: center;
`

const Button = styled.button`
    font-family: 'Lexend Deca', sans-serif;
    background-color: #fff;
    color: #52B6FF;
    font-size: 18px;
    border: none;
    cursor: pointer;
`

const Hoje = styled.button`
    width: 91px;
    height: 91px;
    border-radius: 50%;
    background-color: #52B6FF;
    font-family: 'Lexend Deca', sans-serif;
    color: #fff;
    font-size: 18px;
    font-weight: 400;
    margin-bottom: 50px;
    display: flex;
    justify-content: center;
    align-items: center;
    border: none;
    cursor: pointer;
`
