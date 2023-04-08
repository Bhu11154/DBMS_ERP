import { useNavigate } from "react-router-dom";
import { Button} from 'semantic-ui-react'

const NavButton = ({name, pos, top, posi="right"}) =>{
    const navigate = useNavigate();
    return (
      <>
        <Button labelPosition={posi} icon={posi + " chevron"} content={name} onClick={() => navigate(`/${name}`)}
        style={{position: "absolute", right:`${pos}%` , top: `${top}%`}}/>
      </>
    );
  }
  
export default NavButton;