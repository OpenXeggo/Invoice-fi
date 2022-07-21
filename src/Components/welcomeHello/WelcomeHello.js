import Button from "../Button/Button";
import PlusIcon from "../../assets/plus.svg";
import PlugIcon from "../../assets/plugin.svg";
import "./welcomeHello.css";

const WelcomeHello = ({ account, user }) => {
  return (
    <div className="hello-welcome-wrapper">
      <div className="greeting">
        {user ? <h1>Welcome Back, {user.username}</h1> : <h1>Hello there!!</h1>}
        <p>Kindly connect your wallet to get started.</p>
      </div>
      <Button
        Icon={user ? PlusIcon : PlugIcon}
        text={user ? "Create Invoice" : "Connect Wallet"}
      />
    </div>
  );
};

export default WelcomeHello;
