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
import { mask } from "remask";

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
  phone: yup.string().required("O Telefone é obrigatório"),
  birthday: yup.date().required("Data de nascimento é obrigatório"),
  cpf: yup.string().required("O cpf é obrigatório"),
  email: yup
    .string()
    .required("O email é obrigatório")
    .email("Digite um email válido"),
});

export default function RegisteLector() {
  const [cpf, setCpf] = useState("");
  const [phone, setPhone] = useState("");
  let navigate = useNavigate();
  const [isLoading, setIsLoading] = useState(false);

  /*funcoes*/
  const onChangeCpf = (e: any) => {
    setCpf(mask(e.target.value, ["999.999.999-99"]));
  };

  const onChangePhone = (e: any) => {
    setPhone(mask(e.target.value, ["(99) 9 9999-9999"]));
  };

  /*lidar com formulário */
  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm<ILector>({
    resolver: yupResolver(validationRegistrerLector as any),
  });

  /* consulta backend */
  const registerLector = (data: ILector) =>
    api
      .post("/lector/registerlector", data, {})
      .then((res) => {
        setIsLoading(true);
        toast.success(res.data.message);
        setTimeout(() => {
          navigate("/lector");
        }, 2000);
      })
      .catch((err) => {
        const message =
          err.response.data.message || err.response.data.errors[0].msg;
            toast.error(message);
      });

  return (
    <>
      <Head title="Bib.Gestão - Cadastro de Leitor" />
      <Drawer />
      <div className="container d-flex justify-content-center">
        <Card sx={{ width: 950 }}>
          <ToastContainer />
          <CardContent>
            <Typography sx={{ fontSize: 20 }} color="text.primary" gutterBottom>
              <i className="fa fa-user-plus fa-2x" aria-hidden="true"></i>{" "}
              Cadastro de Leitores
            </Typography>
            <br />
            <p>Cadastre todos os dados do Leitor!</p>
            <Box
              component="form"
              sx={{ flexGrow: 1 }}
              noValidate
              autoComplete="off"
              onSubmit={handleSubmit(registerLector)}
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
                    />
                    <p className="error-message">{errors.name?.message}</p>
                  </div>
                </Grid>
                <Grid item lg={6} md={6} xs={12}>
                  <div className="d-flex flex-column gap-1">
                    <TextField
                      id="phone"
                      {...register("phone")}
                      label="Telefone"
                      size="small"
                      fullWidth
                      variant="outlined"
                      onChange={onChangePhone}
                      value={phone}
                      type="text"
                    />
                    <p className="error-message">{errors.phone?.message}</p>
                  </div>
                </Grid>
                <Grid item lg={6} md={6} xs={12}>
                  <div className="d-flex flex-column gap-1">
                    <TextField
                      id="birthday"
                      {...register("birthday")}
                      label="Data de Nascimento"
                      size="small"
                      type="date"
                      fullWidth
                      variant="outlined"
                      InputLabelProps={{
                        shrink: true,
                      }}
                    />
                    <p className="error-message">{errors.birthday?.message}</p>
                  </div>
                </Grid>
                <Grid item lg={6} md={6} xs={12}>
                  <div className="d-flex flex-column gap-1">
                    <TextField
                      id="cpf"
                      {...register("cpf")}
                      label="CPF"
                      variant="outlined"
                      fullWidth
                      type="text"
                      onChange={onChangeCpf}
                      value={cpf}
                      placeholder="000.000.000-00"
                      size="small"
                    />
                    <p className="error-message">{errors.cpf?.message}</p>
                  </div>
                </Grid>
                <Grid item lg={6} md={6} xs={12}>
                  <div className="d-flex flex-column gap-1">
                    <TextField
                      id="email"
                      {...register("email")}
                      label="E-mail"
                      variant="outlined"
                      fullWidth
                      type="email"
                      placeholder="usuario@dominio.com"
                      size="small"
                    />
                    <p className="error-message">{errors.email?.message}</p>
                  </div>
                </Grid>
              </Grid>
              <ButtonDefault
                link="/lector"
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
