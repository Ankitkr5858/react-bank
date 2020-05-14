import React, { useState, useEffect } from "react";
import { lighten, makeStyles } from "@material-ui/core/styles";
import Table from "@material-ui/core/Table";
import TableBody from "@material-ui/core/TableBody";
import TableCell from "@material-ui/core/TableCell";
import TableContainer from "@material-ui/core/TableContainer";
import TableHead from "@material-ui/core/TableHead";
import TablePagination from "@material-ui/core/TablePagination";
import TableRow from "@material-ui/core/TableRow";
import Toolbar from "@material-ui/core/Toolbar";
import Typography from "@material-ui/core/Typography";
import Paper from "@material-ui/core/Paper";
import Select from "@material-ui/core/Select";
import MenuItem from "@material-ui/core/MenuItem";
import SearchIcon from "@material-ui/icons/Search";
import apiRequest from "./utils/api";
import FormControl from "@material-ui/core/FormControl";
import InputLabel from "@material-ui/core/InputLabel";
import TextField from "@material-ui/core/TextField";
import InputAdornment from "@material-ui/core/InputAdornment";

import Loader from "./Loader";
import FormGroup from "@material-ui/core/FormGroup";

const useToolbarStyles = makeStyles((theme) => ({
  root: {
    paddingLeft: theme.spacing(2),
    paddingRight: theme.spacing(1),
  },
  highlight:
    theme.palette.type === "light"
      ? {
          color: theme.palette.secondary.main,
          backgroundColor: lighten(theme.palette.secondary.light, 0.85),
        }
      : {
          color: theme.palette.text.primary,
          backgroundColor: theme.palette.secondary.dark,
        },
  title: {
    flex: "1 1 100%",
  },
  form: {
    flexWrap: "wrap",
    flexDirection: "column",
    [theme.breakpoints.up('md')]: {
      flexWrap: "nowrap",
      flexDirection: "row",
    }
  },
  formControl: {
    margin: theme.spacing(1),
    minWidth: 150,
  },
  textField: {
    margin: theme.spacing(2, 0),
    minWidth: 200,
    [theme.breakpoints.up('md')]: {
      margin: theme.spacing(2, 0, 0, 0),
    }
  },
  selectEmpty: {
    marginTop: theme.spacing(2),
  },
}));

const columns = [
  { id: "bank_name", label: "Bank", minWidth: 170 },
  { id: "ifsc", label: "IFSC", minWidth: 100 },
  {
    id: "branch",
    label: "Branch",
    minWidth: 170,
  },
  {
    id: "bank_id",
    label: "Bank ID",
    minWidth: 170,
  },
  {
    id: "address",
    label: "Address",
    maxWidth: 300,
  },
];

const useStyles = makeStyles( {
  root: {
    width: "100%",
  },
  container: {
    maxHeight: 440,
  },
})

function Home() {
  const classes = useStyles();
  const toolBarClasses = useToolbarStyles();
  const [page, setPage] = useState(0);
  const [rowsPerPage, setRowsPerPage] = useState(10);
  const [banks, setBanks] = useState([]);
  const [allBanks, setAllBanks] = useState([]);
  const [city, setCity] = useState("");
  const [category, setCategory] = useState("");
  const [search, setSearch] = useState("");
  const [fetching, setFetching] = useState(false);

  useEffect(() => {
    async function getBanks() {
      setFetching(true);
      const response = await apiRequest("", null, "GET");
      setAllBanks(response);
      setBanks(response);
      setFetching(false);
    }

    getBanks();
  }, []);

  useEffect(() => {
    let b = allBanks;

    if (city) {
      b = b.filter((bank) => bank.city === city);
    }

    if (search && category) {
      b = b.filter((bank) => bank[category].includes(search));
    }

    setBanks(b);
  }, [search, category, city, allBanks]);

  const handleChangePage = (event, newPage) => {
    setPage(newPage);
  };

  const handleChangeRowsPerPage = (event) => {
    setRowsPerPage(+event.target.value);
    setPage(0);
  };

  return fetching ? (
    <Loader />
  ) : (
    <Paper className={classes.root}>
      <Toolbar>
        <Typography
          className={toolBarClasses.title}
          variant="h6"
          id="tableTitle"
          component="div"
        >
          Banks
        </Typography>
        <FormGroup className={toolBarClasses.form}>
          <FormControl className={toolBarClasses.formControl}>
            <InputLabel id="select-city">Select City</InputLabel>
            <Select
              labelId="select-city"
              id="city"
              value={city}
              onChange={(e) => {
                setCity(e.target.value);
              }}
            >
              <MenuItem value={"MUMBAI"}>MUMBAI</MenuItem>
              <MenuItem value={"CHENNAI"}>CHENNAI</MenuItem>
              <MenuItem value={"HYDERABAD"}>HYDERABAD</MenuItem>
            </Select>
          </FormControl>
          <FormControl className={toolBarClasses.formControl}>
            <InputLabel id="select-category">Select Category</InputLabel>
            <Select
              labelId="select-category"
              id="category"
              value={category}
              onChange={(e) => setCategory(e.target.value)}
            >
              <MenuItem value={"bank_name"}>Bank Name</MenuItem>
              <MenuItem value={"ifsc"}>IFSC</MenuItem>
              <MenuItem value={"branch"}>Branch</MenuItem>
            </Select>
          </FormControl>

          <FormControl className={toolBarClasses.formControl}>
            <TextField
              onChange={(e) => setSearch(e.target.value)}
              placeholder="Search"
              className={toolBarClasses.textField}
              id="search"
              value={search}
              disabled={!category}
              InputProps={{
                startAdornment: (
                  <InputAdornment position="start">
                    <SearchIcon />
                  </InputAdornment>
                ),
              }}
            />
          </FormControl>
        </FormGroup>
      </Toolbar>
      <TableContainer className={classes.container}>
        <Table stickyHeader aria-label="sticky table">
          <TableHead>
            <TableRow>
              {columns.map((column) => (
                <TableCell
                  key={column.id}
                  align={column.align}
                  style={{ minWidth: column.minWidth }}
                >
                  {column.label}
                </TableCell>
              ))}
            </TableRow>
          </TableHead>
          <TableBody>
            {banks
              .slice(page * rowsPerPage, page * rowsPerPage + rowsPerPage)
              .map((row) => {
                return (
                  <TableRow hover role="checkbox" tabIndex={-1} key={row.ifsc}>
                    {columns.map((column) => {
                      const value = row[column.id];
                      return (
                        <TableCell key={column.id} align={column.align}>
                          {column.format && typeof value === "number"
                            ? column.format(value)
                            : value}
                        </TableCell>
                      );
                    })}
                  </TableRow>
                );
              })}
          </TableBody>
        </Table>
      </TableContainer>
      <TablePagination
        rowsPerPageOptions={[10, 25, 100]}
        component="div"
        count={banks.length}
        rowsPerPage={rowsPerPage}
        page={page}
        onChangePage={handleChangePage}
        onChangeRowsPerPage={handleChangeRowsPerPage}
      />
    </Paper>
  );
}

export default Home;
