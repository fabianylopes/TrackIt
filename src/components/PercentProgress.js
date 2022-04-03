import styled from "styled-components";

export default function PercentProgress({ done, total, percent, setPercent }){

    if(done  === 0){
        setPercent(0);
    }
    
    setPercent((done / total) * 100);
    
    return (
        <Text Textcolor={percent}>
            {done  === 0 ? 
            'Nenhum hábito concluído ainda' : 
            `${percent.toFixed(0)}% dos hábitos concluídos`}
        </Text>
    );
}

const Text = styled.h3`
    font-family: 'Lexend Deca', sans-serif;
    font-weight: 400;
    font-size: 18px;
    color: ${({ Textcolor }) => Textcolor === 0 ? '#BABABA' : '#8FC549'};
    margin-bottom: 28px;
`
