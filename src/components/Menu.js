import { useContext} from 'react';
import styled from "styled-components";
import { Link } from "react-router-dom";
import { CircularProgressbar, buildStyles } from "react-circular-progressbar";
import "react-circular-progressbar/dist/styles.css";
import PercentageContext from '../contexts/PercentageContext';

export default function Menu() {

    const { progressPercentage } = useContext(PercentageContext);

    return (
        <MenuBar>
            <Link to="/habits">
                <Button>Hábitos</Button>
            </Link>

            <Today>
                <Link to="/today">
                    <CircularProgressbar
                    value={progressPercentage}
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
            </Today>

            <Link to="/history">
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

const Today = styled.button`
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
