/*imports REACT */
import { Link } from "react-router-dom";

/*imports MUI */
import { Button } from "@mui/material";

/*INTERFACE */
import { IButton } from "./ComponentsInterfaces";

function ButtonDefault(props: IButton) {
  return (
    <div className="btn-default btn-default-lg">
      <Button type="submit" variant="contained" color="success">
        {props.contentBtnPrimary}
      </Button>
      <Link to={props.link}>
        <Button className="btn-default mx-2" variant="contained" color="primary">
          {props.contentBtnSecondary}
        </Button>
      </Link>
    </div>
  );
}

export { ButtonDefault };
