import styled from "styled-components";

const Container = styled.div`
    width: 375px;
    min-height: 100vh;
    padding-top: 98px;
    padding-bottom: 70px;
    background-color: #E5E5E5;

    display: flex;
    justify-content: center;
    align-items: center;
    flex-direction: column;
`

const Body = styled.div`
    width: 375px;
    min-height: 100vh;
    background-color: #E5E5E5;
    padding-bottom: 70px;
    padding-left: 17px;
    padding-right: 18px;
`

const Top = styled.div`
    margin-bottom: 30px;
    display: flex;
    align-items: center;
    justify-content: space-between;
`

const Title = styled.h2`
    font-family: 'Lexend Deca', sans-serif;
    font-weight: 400;
    font-size: 23px;
    color: #126BA5;
    padding-bottom: 17px;
`

const Plus = styled.button`
    font-family: 'Lexend Deca', sans-serif;
    width: 40px;
    height: 35px;
    background-color: #52B6FF;
    color: #fff;
    font-size: 27px;
    border: none;
    border-radius: 4.6px;
    display: flex;
    justify-content: center;
    align-items: center;
    cursor: pointer;    
`

const NewHabit = styled.div`
    width: 340px;
    height: 180px;
    background-color: #fff;
    border-radius: 5px;
    margin-top: 20px;
    margin-bottom: 30px;
    padding: 18px;
`

const Input = styled.input`
    width: 303px;
    height: 45px;
    border-radius: 5px;
    border: 1px solid #D4D4D4;
    padding-left: 10px;
    font-size: 20px;
    font-weight: 400;
    outline: 0;
    background-color: ${({handleLoading}) => handleLoading ? "#F2F2F2" : "#FFFFFF"};
    color: ${({handleLoading}) => handleLoading ? "#AFAFAF" : "#000"};
    ::placeholder{
        color: #DBDBDB;
    }
`

const Cancel = styled.button`
    font-family: 'Lexend Deca', sans-serif;
    background-color: #fff;
    color: #52B6FF;
    width: 70px;
    height: 20px;
    border: none;
    font-size: 16px;
    margin-right: 23px;
    opacity: ${({handleLoading}) => handleLoading ? 0.7 : 1};
    cursor: pointer;
`
const Save = styled.button`
    font-family: 'Lexend Deca', sans-serif;
    background-color: #52B6FF;
    color: #fff;
    width: 84px;
    height: 35px;
    border: none;
    border-radius: 4px;
    font-size: 16px;
    text-align: center;
    opacity: ${({handleLoading}) => handleLoading ? 0.7 : 1};
    cursor: pointer;
`

const CreateHabit = styled.div`
    display: flex;
    justify-content: end;
    align-items: center;
`

const Week = styled.div`
    margin-top: 8px;
`

const WeekDay = styled.button`
    width: 30px;
    height: 30px;
    border-radius: 5px;
    background-color: ${({daysColor}) => daysColor ? '#DBDBDB' : '#fff'};
    color: ${({daysColor}) => daysColor ? '#fff' : '#DBDBDB'};
    border: 1px solid #D5D5D5;
    font-family: 'Lexend Deca', sans-serif;
    font-size: 20px;
    margin-right: 4px;
    margin-bottom: 30px;
    cursor: ${({pointer}) => pointer ?  'pointer' : 'default'};
`

const HabitName = styled.h3`
    font-family: 'Lexend Deca', sans-serif;
    font-weight: 400;
    font-size: 20px;
    color: #666;
    margin-bottom: 8px;
`

const Habits = styled.div`
    width: 340px;
    height: 90px;
    background-color: #fff;
    border-radius: 5px;
    margin-bottom: 20px;
    padding: 13px 10px 15px 14px;
`

const TitleHabit = styled.div`
    display: flex;
    justify-content: space-between;
    img {
        width: 13px;
        height: 15px;
        cursor: pointer;
    }
`

const Text = styled.h3`
    font-family: 'Lexend Deca', sans-serif;
    font-weight: 400;
    font-size: 18px;
    color: #666;
    margin-bottom: 28px;
`


export {
    Container,
    Body,
    Top,
    Title,
    Plus,
    NewHabit,
    Input,
    Cancel,
    Save,
    CreateHabit,
    Week,
    WeekDay,
    HabitName,
    Habits,
    TitleHabit,
    Text,
}
