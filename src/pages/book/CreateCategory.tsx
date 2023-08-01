import Drawer from "../components/Drawer";
import Head from "../components/Head";
import { useNavigate } from "react-router-dom";

import { ILector } from "../components/ComponentsInterfaces";

/* Imports MUI */
import {
  TextField,
  Card,
  CardContent,
  Typography,
  Grid,
  Box,
} from "@mui/material";

/* Imports Libs */
import * as yup from "yup";
import { ToastContainer, toast } from "react-toastify";
import { yupResolver } from "@hookform/resolvers/yup";

/* Imports CSS */
import "react-toastify/dist/ReactToastify.css";


/* Imports Extras */
import { api } from "../../api/api";
import { useForm } from "react-hook-form";
import { ButtonDefault } from "../components/Button";
import { Spinner } from "../components/Spinner";
import { useState } from "react";


/* Validações */
const validationRegistrerLector = yup.object().shape({
  name: yup.string().required("O nome é obrigatório"),
});

export default function CreateCategory() {
  let navigate = useNavigate();
  const [isLoading, setIsLoading] = useState(false);



  /*lidar com formulário */
  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm<ILector>({
    resolver: yupResolver(validationRegistrerLector as any),
  });

  /* consulta backend */
  const registerCategory = (data: ILector) =>
    api
      .post("/category/registerCategory", data, {})
      .then((res) => {
        setIsLoading(true);
        toast.success(res.data.message);
        setTimeout(() => {
          navigate("/category");
        }, 2000);
      })
      .catch((err) => {
        const message =
          err.response.data.message || err.response.data.errors[0].msg;
            toast.error(message);
      });

  return (
    <>
      <Head title="Bib.Gestão - Cadastro de Livro" />
      <Drawer />
      <div className="container d-flex justify-content-center">
        <Card sx={{ width: 950 }}>
          <ToastContainer />
          <CardContent>
            <Typography sx={{ fontSize: 20 }} color="text.primary" gutterBottom>
              <i className="fa fa-user-plus fa-2x" aria-hidden="true"></i>{" "}
              Cadastro de Categoria
            </Typography>
            <br />
            <p>Cadastre a categoria!</p>
            <Box
              component="form"
              sx={{ flexGrow: 1 }}
              noValidate
              autoComplete="off"
              onSubmit={handleSubmit(registerCategory)}
            >
              <Grid container spacing={2}>
                <Grid item lg={12} md={12} xs={12}>
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
                    />
                    <p className="error-message">{errors.name?.message}</p>
                  </div>
                </Grid>
                
              </Grid>
              <ButtonDefault
                link="/category"
                contentBtnPrimary={isLoading ? <Spinner /> : "Cadastrar"}
                contentBtnSecondary="Cancelar"
              />
            </Box>
          </CardContent>
        </Card>
      </div>
    </>
  );
}
