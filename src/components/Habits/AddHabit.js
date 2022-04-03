import { NewHabit, Input, Cancel, Save, CreateHabit, Week, WeekDay } from './style';
import { useState, useContext } from 'react';
import UserContext from '../../contexts/UserContext';
import Loading from '../Loading';
import api from '../../services/api';

export default function AddHabit({ weekDays, setOpenForm }){
    
    const { token, loading, setLoading } = useContext(UserContext);
        
    setLoading(false);

    const [habitName, setHabitName] = useState('');
    const [selectedDays, setSelectedDays] = useState([]);
    
    function selectDay(day){     
        
        console.log('hello there');

        if(selectedDays.includes(day)){
            setSelectedDays(selectedDays.filter(f => f === day ? false : true));
        } else {
            setSelectedDays([...selectedDays, day]);
        }     
    }

    const body = {name: habitName, days: selectedDays}

    function handleHabit(){
        setLoading(true);

        const promise = api.addHabit(body, token);

        promise.then(handleSuccess);
        promise.catch(handleFailure);
    }

    function handleSuccess(){
        setOpenForm(false)
        setHabitName('');
        setSelectedDays([]);
    }

    function handleFailure(error){
        setLoading(false);
        setHabitName('');
        alert(error.response.data.message);
    }

    return (
        <NewHabit>
            <Input 
                type="text" 
                placeholder="nome do hábito" 
                disabled={loading}
                handleLoading={loading}
                value={habitName} 
                onChange={e => setHabitName(e.target.value)}
            >    
            </Input>

            <Week>
                {weekDays.map((day, index) => {
                    return (
                        <WeekDay
                            pointer={true}
                            key={index}
                            disabled={loading}
                            daysColor={selectedDays.includes(index)}
                            onClick={() => selectDay(index)}>{day}
                        </WeekDay>
                    );
                })}
            </Week>

            <CreateHabit>
                <Cancel 
                    type="button"
                    handleLoading={loading} 
                    disabled={loading}
                    onClick={() => setOpenForm(false)}>
                    Cancelar
                </Cancel>

                <Save 
                    handleLoading={loading} 
                    disabled={loading}
                    onClick={handleHabit}>
                    {loading ? <Loading/> : 'Salvar'}                  
                </Save>
            </CreateHabit>
        </NewHabit>  
    );
}
