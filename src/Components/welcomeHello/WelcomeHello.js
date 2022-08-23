import Button from '../Button/Button';
import PlusIcon from '../../assets/plus.svg'
import PlugIcon from '../../assets/plugin.svg'
import './welcomeHello.css';
import { useSelector } from 'react-redux';
import { useNavigate } from 'react-router-dom';

const WelcomeHello = ({account}) => {
    const { username } = useSelector(state=>state.user.userData);

    const navigate = useNavigate();

    const handleRedirect = () => {
        navigate(`create`);
    }

    return (
        <div className='hello-welcome-wrapper mb-40'>
            <div className='greeting'>
                {account?(
                    <h1 className='mb-10'>Welcome Back, { username }</h1>
                ) : (
                    <h1 className='mb-10'>Hello there!!</h1>
                )}
                <p>Create Invoices Seamlessly</p>
            </div>
            <Button 
                clickHandler={handleRedirect}
                Icon={PlusIcon} 
                text="Create Invoice"
            />
        </div>
    );
};

export default WelcomeHello;