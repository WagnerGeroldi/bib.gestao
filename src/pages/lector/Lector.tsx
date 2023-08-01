import Drawer from "../components/Drawer";
import Head from "../components/Head";

/*imports react */

import { Link, useNavigate } from "react-router-dom";
import { useEffect, useMemo, useState } from "react";

/*imports libs */
import { ToastContainer, toast } from "react-toastify";
import DataTable from "react-data-table-component";

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
import { ModalConfirm } from "../components/Modals/ModalConfirm";
import ClearIcon from "@mui/icons-material/Clear";
import { HandleOnlyDate } from "../services/HandleOnlyDate";  
import { ModalInfo } from "../components/Modals/ModalInfo";

const FilterComponent = ({ filterText, onFilter, onClear }: any) => (
  <>
    <div className="d-flex ">
      <input
        id="search"
        type="text"
        placeholder="Pesquisar..."
        aria-label="Search Input"
        value={filterText}
        onChange={onFilter}
      />
      <Button variant="contained" id="button" type="button" onClick={onClear}>
        <ClearIcon />
      </Button>
    </div>
  </>
);

export default function Lector(this: any) {
  const [loading, setLoading] = useState(true);
  const navigate = useNavigate();
  const [lectors, setLectors] = useState([]);
  const [idLector, setIdLector] = useState("");
  const [open, setOpen] = useState(false);
  const [openModalInfo, setOpenModalInfo] = useState(false);
  const handleClose = () => setOpen(false);

  const handleClickOpen = (id: string) => {
    setIdLector(id);
    setOpen(true);
  };

  function handleModalInfo() {
    setOpenModalInfo(true);
  }

  const handleCloseModalInfo = () => {
    setOpenModalInfo(false);
  };

  /*funcoes de mascara personalizada*/
  function maskPhone(phone: string) {
    const p1 = phone.substring(0, 2);
    const p2 = phone.substring(2, 3);
    const p3 = phone.substring(3, 7);
    const p4 = phone.substring(7, 11);

    return `(${p1}) ${p2} ${p3} - ${p4}`;
  }

  function maskCPF(cpf: string) {
    const p1 = cpf.substring(0, 3);
    const p2 = cpf.substring(3, 6);
    const p3 = cpf.substring(6, 9);
    const p4 = cpf.substring(9, 11);

    return `${p1}.${p2}.${p3}-${p4}`;
  }
  /*Consultas BACKEND */

  useEffect(() => {
    api
      .get("/lector/", {})
      .then((res) => {
        setLectors(res.data);
        setLoading(false);
      })
      .catch((err) => {
        toast.error(err.response.data.message);
      });
  }, []);

  async function deleteLector(id: string) {
    await api
      .delete("/lector/delete/" + id)
      .then((res) => {
        const message = res.data.message;
        toast.success(message);
        const newLectors = lectors.filter((product: any) => product.id !== id);
        setLectors(newLectors);
      })
      .catch((err) => {
        toast.error(err.response.data.message);
      });

    handleClose();
  }

  function updateLector(id: number) {
    navigate(`/lector/updateLector/${id}`);
  }

  function booksInUse(id: number) {
    navigate(`/lector/booksInUse/${id}`);
  }

  /*lidar com filtro da lista */
  const [filterText, setFilterText] = useState("");
  const [resetPaginationToggle, setResetPaginationToggle] = useState(false);
  const filteredItems = lectors.filter(
    (item: any) =>
      item.name && item.name.toLowerCase().includes(filterText.toLowerCase())
  );

  const subHeaderComponentMemo = useMemo(() => {
    const handleClear = () => {
      if (filterText) {
        setResetPaginationToggle(!resetPaginationToggle);
        setFilterText("");
      }
    };

    return (
      <FilterComponent
        onFilter={(e: any) => setFilterText(e.target.value)}
        onClear={handleClear}
        filterText={filterText}
      />
    );
  }, [filterText, resetPaginationToggle]);

  /*fim lidar com filtro da lista */

  /*criando colunas datatable */

  const columns = [
    {
      name: "Nome",
      selector: (row: any) => row.name,
      sortable: true,
    },
    {
      name: "Cadastro",
      selector: (row: any) => HandleOnlyDate(new Date(row.createdAt)),
    },
    {
      name: "CPF",
      selector: (row: any) => maskCPF(row.cpf),
    },
    {
      name: "Telefone",
      selector: (row: any) => maskPhone(row.phone),
    },
    {
      name: "Livros Pendentes",
      selector: (row: any) =>
        row.booksInUse === 0 ? (
          <Button>{row.booksInUse}</Button>
        ) : (
          <Button onClick={booksInUse.bind(this, row.id)}>
            {row.booksInUse}
          </Button>
        ),
    },
    {
      name: "Ações",
      cell: (row: any) => (
        <IconButton
          aria-label="update"
          size="large"
          onClick={updateLector.bind(this, row.id)}
        >
          <EditIcon />
        </IconButton>
      ),
      allowOverflow: true,
      button: true,
      width: "56px",
    },
    {
      cell: (row: any) => (
        <IconButton
          aria-label="delete"
          size="large"
          onClick={() =>
            row.booksInUse !== 0 ? handleModalInfo() : handleClickOpen(row.id)
          }
        >
          <DeleteIcon />
        </IconButton>
      ),
      allowOverflow: true,
      button: true,
      width: "56px",
    },
  ];

  return (
    <>
      <Head title="Bib.Gestão - Leitores" />
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
          <Link to={`/registerlector`}>
            <Button variant="contained" color="success" startIcon={<AddIcon />}>
              Cadastrar Leitor
            </Button>
          </Link>

          <h1 className="text-center"> Leitores </h1>

          {loading === true ? (
            <p className="loading">Carregando informações...</p>
          ) : (
            <DataTable
              columns={columns as any}
              data={filteredItems}
              pagination
              paginationResetDefaultPage={resetPaginationToggle}
              subHeader
              subHeaderComponent={subHeaderComponentMemo}
              persistTableHead
              dense
            />
          )}
        </Paper>
      </div>
      <ModalConfirm
        action={deleteLector.bind(this, idLector)}
        title="Deseja excluir este Leitor?"
        setOpen={open}
        setClose={handleClose}
        infoOne="Excluir"
      />

      <ModalInfo
        title="Atenção"
        text="Não é possível excluir um leitor com livros pendentes!"
        setOpen={openModalInfo}
        setClose={handleCloseModalInfo}
      />
    </>
  );
}
