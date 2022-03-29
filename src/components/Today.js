import styled from "styled-components";
import Header from './Header';

export default function Today() {
  return (
    <Container>
        <Header/>
    </Container>
  );
}

const Container = styled.div`
    display: flex;
    justify-content: center;
    align-items: center;
    flex-direction: column;
`