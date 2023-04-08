import { useNavigate } from "react-router-dom";
import { Button} from 'semantic-ui-react'

const LogoutBtn = () =>{
    const navigate = useNavigate();
    return (
      <>
        <Button color="red" content='Logout' onClick={() => navigate('/Login')}
        style={{position: "absolute", right:'1%' , top: '2%'}}/>
      </>
    );
  }
  
export default LogoutBtn;

