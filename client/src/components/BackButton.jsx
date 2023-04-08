import { useNavigate } from "react-router-dom";
import { Button} from 'semantic-ui-react'

const BackButton = () =>{
    const navigate = useNavigate();
    return (
      <>
        <Button labelPosition='left' icon='left chevron' content='Back' onClick={() => navigate(-1)}
        style={{position: "absolute", marginLeft:"15%", marginTop: "10px"}}/>
      </>
    );
  }
  
export default BackButton;