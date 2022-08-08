import Button from '../Button/Button';
import PlusIcon from '../../assets/plus.svg'
import PlugIcon from '../../assets/plugin.svg'
import './welcomeHello.css';
import { useSelector } from 'react-redux';

const WelcomeHello = ({account}) => {
    const { username } = useSelector(state=>state.user.userData);

    return (
        <div className='hello-welcome-wrapper'>
            <div className='greeting'>
                {account?(
                    <h1>Welcome Back, { username }</h1>
                ) : (
                    <h1>Hello there!!</h1>
                )}
                <p>Kindly connect your wallet to get started.</p>
            </div>
            <Button 
                Icon={account? PlusIcon:PlugIcon} 
                text={account? "Create Invoice":"Connect Wallet"} 
            />
        </div>
    );
};

export default WelcomeHello;