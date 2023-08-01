import Drawer from "../components/Drawer";
import Head from "../components/Head";

/*imports react */

import { Link, useParams, useNavigate } from "react-router-dom";
import { useEffect, useMemo, useState } from "react";

/*imports libs */
import { ToastContainer, toast } from "react-toastify";

/*imports extras */
import { api } from "../../api/api";

/*imports styles CSS */
import "react-toastify/dist/ReactToastify.css";

/*imports MUI */
import Paper from "@mui/material/Paper";
import { Button, IconButton } from "@mui/material";
import DeleteIcon from "@mui/icons-material/Delete";
import EditIcon from "@mui/icons-material/Edit";
import AddIcon from "@mui/icons-material/Add";
import ClearIcon from "@mui/icons-material/Clear";
import { HandleOnlyDate } from "../services/HandleOnlyDate";

export default function LectorBooksInUse(this: any) {
  const { id } = useParams() as { id: string };
  const [loading, setLoading] = useState(true);
  const navigate = useNavigate();
  const [lector, setLector] = useState([] as any);
  const [idLector, setIdLector] = useState("");
  const [open, setOpen] = useState(false);
  const handleClose = () => setOpen(false);

  const handleClickOpen = (id: string) => {
    setIdLector(id);
    setOpen(true);
  };

  /*Consultas BACKEND */

  useEffect(() => {
    api
      .get("/lector/" + id, {})
      .then((res) => {
        setLector(res.data);
        setLoading(false);
      })
      .catch((err) => {
        toast.error(err.response.data.message);
      });
  }, []);

  return (
    <>
      <Head title={`Livros de ${lector.name}`} />
      <Drawer />
      <ToastContainer />
      <div className="p-3">
        <Paper
          sx={{
            p: 2,
            margin: "auto",
            maxWidth: 1100,
            flexGrow: 1,
            marginTop: 3,
          }}
        >
          <h1 className="text-center"> Livros com o Leitor </h1>
          <h3>
            Aqui vai aparecer a foto da capa do livro
          </h3>
        </Paper>
      </div>
    </>
  );
}
