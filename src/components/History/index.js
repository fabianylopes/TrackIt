import { Container, Body, Title, Text } from './style';
import PercentageContext from '../../contexts/PercentageContext';
import Menu from '../Menu';
import Header from '../Header';

export default function History(){

    const { progressBar } = useContext(PercentageContext);

    return (
        <Container>
            <Header/>
            <Body>
                <Title>Histórico</Title>
                <Text>Em breve você poderá ver o histórico dos seus hábitos aqui!</Text>
            </Body>
            <Menu progressBar={progressBar}/>
        </Container>
    );
}
