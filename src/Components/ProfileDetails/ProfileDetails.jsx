import ProfileIcon from "../../assets/profile.svg";
import SideIcon from "../../assets/side.svg";
import { modifyAddress } from "../../utils/modifyAddress";
import Modal from "../Modal/modal";
import { useMoralis, useMoralisQuery } from "react-moralis";
import "./profiledetails.css";
import { useEffect, useState } from "react";
import { useDispatch } from "react-redux";
import GifImage from "../../assets/loader.png";
import { addUser, checkIfUserExists } from "../../utils/dbQueries";

const ProfileDetails = ({closeModal, account}) => {

    const { authenticate, isAuthenticated, user } = useMoralis();

    const dispatch  = useDispatch();

    const [connecting, setConnecting] = useState(true);
    const [username, setUsername] = useState("");
    const [firstname, setFirstname] = useState("");
    const [lastname, setLastname] = useState("");
    const [email, setEmail] = useState("");

    const addUserData = (result) => {
        const { username, firstname, email, lastname, invoices } = result;
        const profileData = { username, firstname, lastname, email, invoices };
        dispatch({type:"ADD_USER_DATA", payload: profileData});
    }

    const checkUser = async () =>{
        try{
            const result = await checkIfUserExists(account);
            if (result.length === 0 ) {
                setConnecting(false);
            }
            else{
                addUserData(result[0].attributes);
                closeModal();
            }
        } catch (e) {
            console.log(e);
        }
    }

    useEffect(()=>{
        if(isAuthenticated){
            checkUser();
        }
    },[isAuthenticated])

    useEffect(()=>{
        if(!isAuthenticated){
            authenticate({
                onComplete: ()=>{
                    console.log("Authentication complete");
                },
                onError: ()=>{
                    console.log("error authenticating user");
                },
                onSuccess: ()=>{
                    console.log("authentication successful");
    
                },
                signingMessage: "Moralis Authentication",
            });
        }
    },[])

    const handleSubmit = async (e) =>{
        try{
            e.preventDefault();
            if (username.length < 1 ){
                alert("username is empty");
                return;   
            }
            if (firstname.length < 1 ){
                alert("username is empty");
                return;   
            }
            if (lastname.length < 1 ){
                alert("username is empty");
                return;   
            }
            if (email.length < 1 ){
                alert("username is empty");
                return;   
            }
            const profileData = {
                user_id: user.id,
                username: username.trim(),
                lastname: lastname.trim(), 
                firstname: firstname.trim(),
                email: email.trim(),
                walletAddress: account,
                invoices:[]
            }
            const result = await addUser(profileData);
            console.log({result});
            addUserData(profileData);
            closeModal();
        } catch(e){
            console.log(e);
        }
    }

    return ( 
        <>
        {!connecting ? (
        <Modal>
            <div className="details-container flex flex-col justify-center gap-20">
                <div className="text-center" >
                    <span className="font-20 line-30 weight-600">You are connected!!</span>
                </div>
                <div className="text-center">
                    <img src={ProfileIcon} alt="" width="70px" height="70px" />
                    <div className="address-box flex gap-5 items-center">
                        <div className="green-button"></div>
                        <span>{modifyAddress(account)}</span>
                    </div>
                </div>
                <form onSubmit={handleSubmit}>
                    <div>
                        <span className="font-14 line-21 weight-600" >Complete your information</span>
                        <div className="modal-inputs">
                            <input type="text" placeholder="Username" className="modal-input" value={username} onChange={e=>setUsername(e.target.value)} />
                            <input type="text" placeholder="First Name" className="basis-45 modal-input" value={firstname} onChange={e=>setFirstname(e.target.value)} />
                            <input type="text" placeholder="Last Name" className="basis-45 modal-input" value={lastname} onChange={e=>setLastname(e.target.value)} />
                            <input type="text" placeholder="Email" className="modal-input" value={email} onChange={e=>setEmail(e.target.value)} />
                        </div>
                    </div>
                    <div className="modal-button">
                        <button className="flex items-center justify-center gap-15">Get Started <img src={SideIcon} /></button>
                    </div>
                </form>
            </div>
        </Modal> 
        ) : (
        <Modal>
            <div className="moralis-modal">
                <div className="text-center mb-5"><img src={GifImage} alt={"Gif Loader"} /></div>
                <div><span className="weight-600 font-20 line-30" >Connecting To Moralis...</span></div>
                <div className="text-center"><span className="font-12 ">(Please Sign Transaction)</span></div>   
            </div>
        </Modal>
        )}
        </>
    );
}
 
export default ProfileDetails;