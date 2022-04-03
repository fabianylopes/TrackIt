import { CircularProgressbar, buildStyles } from "react-circular-progressbar";
import "react-circular-progressbar/dist/styles.css";
import { MenuBar, Button, Today } from './style';
import { Link } from "react-router-dom";

export default function Menu({ progressBar }) {

    return (
        <MenuBar>
            <Link to="/habits">
                <Button>Hábitos</Button>
            </Link>

            <Today>
                <Link to="/today">
                    <CircularProgressbar
                    value={progressBar}
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
