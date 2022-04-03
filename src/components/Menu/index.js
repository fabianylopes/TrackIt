import { MenuBar, Button, Today } from './style';
import { useContext} from 'react';
import { Link } from "react-router-dom";
import { CircularProgressbar, buildStyles } from "react-circular-progressbar";
import "react-circular-progressbar/dist/styles.css";
import PercentageContext from '../../contexts/PercentageContext';

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
