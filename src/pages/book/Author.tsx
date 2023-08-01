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

export default function Author(this: any) {
  const [loading, setLoading] = useState(true);
  const navigate = useNavigate();
  const [authors, setAuthors] = useState([]);
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
      .get("/author/", {})
      .then((res) => {
        setAuthors(res.data);
        setLoading(false);
      })
      .catch((err) => {
        toast.error(err.response.data.message);
      });
  }, []);

  async function deleteAuthor(id: string) {
    await api
      .delete("/author/delete/" + id)
      .then((res) => {
        const message = res.data.message;
        toast.success(message);
        const newAuthors = authors.filter((author: any) => author.id !== id);
        setAuthors(newAuthors);
      })
      .catch((err) => {
        toast.error(err.response.data.message);
      });

    handleClose();
  }

  function updateAuthor(id: number) {
    navigate(`/author/updateAuthor/${id}`);
  }

  /*lidar com filtro da lista */
  const [filterText, setFilterText] = useState("");
  const [resetPaginationToggle, setResetPaginationToggle] = useState(false);
  const filteredItems = authors.filter(
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
      name: "Origem",
      selector: (row: any) => row.origin,
    },
    {
      name: "Ações",
      cell: (row: any) => (
        <IconButton
          aria-label="update"
          size="large"
          onClick={updateAuthor.bind(this, row.id)}
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
          onClick={() => handleClickOpen(row.id)}
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
      <Head title="Bib.Gestão - Autores" />
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
          <Link to={`/createauthor`}>
            <Button variant="contained" color="success" startIcon={<AddIcon />}>
              Cadastrar Autor
            </Button>
          </Link>

          <h1 className="text-center"> Autores Cadastrados </h1>

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
        action={deleteAuthor.bind(this, idLector)}
        title="Deseja excluir este Autor?"
        setOpen={open}
        setClose={handleClose}
        infoOne="Excluir"
      />
    </>
  );
}
