import { Week, WeekDay, HabitName, Habits, TitleHabit, Text } from './style';
import { useContext } from 'react';
import Trashcan from '../../assets/delete.png';
import UserContext from '../../contexts/UserContext';
import api from '../../services/api';

export default function MyHabits({ weekDays, loadHabits, habits }){

    const { token } = useContext(UserContext);

    function deleteHabit(id){
        // eslint-disable-next-line no-restricted-globals
        const confirmDelete = confirm('Deseja realmente deletar este hábito?');

        if(confirmDelete){

            const promise = api.deleteHabit(id, token);
            
            promise.then(loadHabits);
            promise.catch(error => console.log(error))
        }
    }

    if(habits.length === 0){
        return (
            <Text>Você não tem nenhum hábito cadastrado ainda. Adicione um hábito para começar a trackear!</Text>
        );
    }

    return (
        <>
            {habits.map(({id, name, days}) => {
                return (
                    <Habits key={id}>
                         <TitleHabit>
                            <HabitName>{name}</HabitName>
                            <img src={Trashcan} alt="delete-icon" onClick={() => deleteHabit(id)}/>
                        </TitleHabit>
                        
                        <Week>
                            {weekDays.map((day, index) => 
                            <WeekDay 
                                pointer={false}
                                key={index}
                                daysColor={days.includes(index)}
                            >{day}
                            </WeekDay>)}
                        </Week>                    
                    </Habits>
                );
            })}
        </>  
    );
}
