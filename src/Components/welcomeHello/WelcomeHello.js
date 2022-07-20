import Button from '../Button/Button';
import PlusIcon from '../../assets/plus.svg'
import PlugIcon from '../../assets/plugin.svg'
import './welcomeHello.css'

const WelcomeHello = ({account}) => {
    return (
        <div className='hello-welcome-wrapper'>
            <div className='greeting'>
                {account?(<h1>Welcome Back, Xeggo</h1>):(<h1>Hello there!!</h1>)}
                <p>Kindly connect your wallet to get started.</p>
            </div>
            <Button 
                Icon={account?PlusIcon:PlugIcon} 
                text={account?"Create Invoice":"Connect Wallet"} 
            />
        </div>
    );
};

export default WelcomeHello;