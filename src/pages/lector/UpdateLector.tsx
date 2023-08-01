/* Imports REACT */
import { useNavigate } from "react-router-dom";
import { useForm } from "react-hook-form";
import { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import { ILector } from "../components/ComponentsInterfaces";

/* Imports MUI */
import {
  Box,
  Grid,
  TextField,
  Card,
  CardContent,
  Typography,
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
import { ButtonDefault } from "../components/Button";
import Head from "../components/Head";
import { HandleOnlyDate } from "../services/HandleOnlyDate";
import { Spinner } from "../components/Spinner";
import Drawer from "../components/Drawer";




/* Validações */
const validationUpdateLector = yup.object().shape({
  name: yup.string().required("O nome é obrigatório"),
  phone: yup.string().required("O Telefone é obrigatório"),
  birthday: yup.date().required("Data de nascimento é obrigatório"),
  cpf: yup.string().required("O cpf é obrigatório"),
  email: yup
    .string()
    .required("O email é obrigatório")
    .email("Digite um email válido"),
});

export default function UpdateLector() {
  let navigate = useNavigate();
  const [isLoading, setIsLoading] = useState(false);
  const { id } = useParams() as { id: string };
  const [lectorData, setLectorData] = useState([] as any);
  const [phone, setPhone] = useState("");
  const [cpf, setCpf] = useState("");

  /*lidar com formulário */
  const {
    register,
    handleSubmit,
    formState: { errors },
    reset,
  } = useForm<ILector>({
    resolver: yupResolver(validationUpdateLector as any),
  });

   /*funcoes*/
   const onChangeCpf = (e: any) => {
    setCpf(mask(e.target.value, ["999.999.999-99"]));
  };

  const onChangePhone = (e: any) => {
    setPhone(mask(e.target.value, ["(99) 9 9999-9999"]));
  };


  /* consulta backend */

  useEffect(() => {
    api
      .get(`/lector/${id}`)
      .then((res) => {
        reset(res.data);
        setLectorData(res.data);
      })
      .catch((err) => {
        toast.error(err.response.data.message);
      });
  }, []);

  const updateLector = (data: ILector) =>
    api
      .put(`/lector/update/${id}`, data)
      .then((res) => {
        setIsLoading(true);
        toast.success(res.data.message);
        setTimeout(() => {
          navigate("/lector");
        }, 1000);
      })
      .catch((err) => {
        const message =
          err.response.data.message || err.response.data.errors[0].msg;
        toast.error(message);
      });

  return (
    <>
      <Head title="Bib.Gestão - Editar Leitor" />
      <Drawer />
      <ToastContainer />
      <div className="container-fluid mt-4 mx-auto d-flex justify-content-center">
        <Card sx={{ maxWidth: 875 }}>
          <ToastContainer />
          <CardContent>
            <Typography sx={{ fontSize: 20 }} color="text.primary" gutterBottom>
              <i className="fa fa-wrench fa-2x" aria-hidden="true"></i>{" "}
              Atualizar Leitor
            </Typography>
            <br />
            <div className="d-flex justify-content-between align-items-center p-2 gap-5">
              <p>Atualização de dados do Leitor!</p>
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
                    <TextField
                      id="phone"
                      {...register("phone")}
                      label="Telefone"
                      size="small"
                      fullWidth
                      onChange={onChangePhone}
                      value={phone}
                      variant="outlined"
                      type="text"
                      InputLabelProps={{
                        shrink: true,
                      }}
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
                      placeholder="000.000.000-00"
                      size="small"
                      onChange={onChangeCpf}
                      value={cpf}
                      InputLabelProps={{
                        shrink: true,
                      }}
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
                      InputLabelProps={{
                        shrink: true,
                      }}
                    />
                    <p className="error-message">{errors.email?.message}</p>
                  </div>
                </Grid>
              </Grid>
              <ButtonDefault
                link={`/lector`}
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
