import { NewHabit, Input, Cancel, Save, CreateHabit, Week, WeekDay } from './style';
import { useState, useContext, useEffect } from 'react';
import Loader from 'react-loader-spinner';
import UserContext from '../../contexts/UserContext';
import api from '../../services/api';

export default function AddHabit({ weekDays, setOpenForm, loadHabits }){
    
    const { token } = useContext(UserContext);

    const [habitName, setHabitName] = useState('');
    const [selectedDays, setSelectedDays] = useState([]);
    const [loading, setLoading] = useState(false);
    
    useEffect(() => {
        return () => {
        }
      }, []);

    function selectDay(day){     

        if(selectedDays.includes(day)){
            setSelectedDays(selectedDays.filter(f => f === day ? false : true));
        } else {
            setSelectedDays([...selectedDays, day]);
        }     
    }

    const body = {name: habitName, days: selectedDays}

    function createHabit(){
        setLoading(true);

        const promise = api.addHabit(body, token);

        promise.then(handleSuccess);
        promise.catch(handleFailure);
    }

    function handleSuccess(){
        setOpenForm(false)
        setHabitName('');
        setSelectedDays([]);
        loadHabits();
    }

    function handleFailure(error){
        setLoading(false);
        setHabitName('');
        alert(error.response.data.message);
    }

    return (
        <NewHabit onSubmit={e => e.preventDefault()}>
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
                    onClick={() => setOpenForm(false)}
                >
                    Cancelar
                </Cancel>

                <Save 
                    handleLoading={loading} 
                    disabled={loading}
                    onClick={createHabit}
                >
                    {loading ? <Loader type="ThreeDots" color="#fff" height={50} width={50} /> : 'Salvar'}         
                </Save>
            </CreateHabit>
        </NewHabit>  
    );
}
