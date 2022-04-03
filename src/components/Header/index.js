import { Head, Logo } from './style'; 
import { useContext } from 'react';
import UserContext from '../../contexts/UserContext';

export default function Header() {
    
  const { userInfo } = useContext(UserContext);

  return (
    <Head>
        <Logo>TrackIt</Logo>
        <img src={userInfo.image} alt=""/>
    </Head>
  );
}
