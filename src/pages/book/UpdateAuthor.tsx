/* Imports REACT */
import { useNavigate } from "react-router-dom";
import { useForm } from "react-hook-form";
import { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import { IAuthor } from "../components/ComponentsInterfaces";

/* Imports MUI */
import {
  Box,
  Grid,
  TextField,
  Card,
  CardContent,
  Typography,
  MenuItem,
  Select,
} from "@mui/material";

/* Imports Libs */
import * as yup from "yup";
import { ToastContainer, toast } from "react-toastify";
import { yupResolver } from "@hookform/resolvers/yup";

/* Imports CSS */
import "react-toastify/dist/ReactToastify.css";

/* Imports Extras */
import { api } from "../../api/api";
import { ButtonDefault } from "../components/Button";
import Head from "../components/Head";
import { HandleOnlyDate } from "../services/HandleOnlyDate";
import { Spinner } from "../components/Spinner";
import Drawer from "../components/Drawer";

/* Validações */
const validationUpdateAuthor = yup.object().shape({
  name: yup.string().required("O nome é obrigatório"),
  origin: yup.string().required("A origem é obrigatório"),
});

export default function UpdateAuthor() {
  let navigate = useNavigate();
  const [isLoading, setIsLoading] = useState(false);
  const { id } = useParams() as { id: string };
  const [lectorData, setLectorData] = useState([] as any);
  
  /*lidar com formulário */
  const {
    register,
    handleSubmit,
    formState: { errors },
    reset,
  } = useForm<IAuthor>({
    resolver: yupResolver(validationUpdateAuthor as any),
  });

  /* consulta backend */

  useEffect(() => {
    api
      .get(`/author/${id}`)
      .then((res) => {
        reset(res.data);
        setLectorData(res.data);
      })
      .catch((err) => {
        toast.error(err.response.data.message);
      });
  }, []);


  const updateLector = (data: IAuthor) =>
    api
      .put(`/author/update/${id}`, data)
      .then((res) => {
        setIsLoading(true);
        toast.success(res.data.message);
        setTimeout(() => {
          navigate("/author");
        }, 1000);
      })
      .catch((err) => {
        const message =
          err.response.data.message || err.response.data.errors[0].msg;
        toast.error(message);
      });

  return (
    <>
      <Head title="Bib.Gestão - Editar Autor" />
      <Drawer />
      <ToastContainer />
      <div className="container-fluid mt-4 mx-auto d-flex justify-content-center">
        <Card sx={{ maxWidth: 875 }}>
          <ToastContainer />
          <CardContent>
            <Typography sx={{ fontSize: 20 }} color="text.primary" gutterBottom>
              <i className="fa fa-wrench fa-2x" aria-hidden="true"></i>{" "}
              Atualizar Autor
            </Typography>
            <br />
            <div className="d-flex justify-content-between align-items-center p-2 gap-5">
              <p>Atualização de dados do Autor!</p>
              <p>
                Data do cadastro:&nbsp;
                <strong>
                  {HandleOnlyDate(new Date(lectorData.createdAt))}
                </strong>
              </p>
            </div>
            <Box
              onSubmit={handleSubmit(updateLector)}
              component="form"
              sx={{ flexGrow: 1 }}
              noValidate
              autoComplete="off"
            >
              <Grid container spacing={2}>
                <Grid item lg={6} md={6} xs={12}>
                  <div className="d-flex flex-column gap-1">
                    <TextField
                      id="name"
                      {...register("name")}
                      label="Nome"
                      variant="outlined"
                      fullWidth
                      type="text"
                      placeholder="Nome Completo"
                      size="small"
                      InputLabelProps={{
                        shrink: true,
                      }}
                    />
                    <p className="error-message">{errors.name?.message}</p>
                  </div>
                </Grid>

                <Grid item lg={6} md={6} xs={12}>
                  <div className="d-flex flex-column gap-1">
                    <Select
                      id="origin"
                      {...register("origin")}
                      label="E-mail"
                      variant="outlined"
                      fullWidth
                      type="email"
                      placeholder="Escolha..."
                      size="small"
                    >
                      <MenuItem value="-">Escolha...</MenuItem>
                      <MenuItem value="BRA">Brasileiro</MenuItem>
                      <MenuItem value="EST">Estrangeiro</MenuItem>
                    </Select>
                    <p className="error-message">{errors.origin?.message}</p>
                  </div>
                </Grid>
              </Grid>
              <ButtonDefault
                link={`/author`}
                contentBtnPrimary={isLoading ? <Spinner /> : "Atualizar"}
                contentBtnSecondary="Cancelar"
              />
            </Box>
          </CardContent>
        </Card>
      </div>
    </>
  );
}
