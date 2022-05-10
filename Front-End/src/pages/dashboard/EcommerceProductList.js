import {
  Box,
  Button,
  Card,
  Container,
  Table,
  TableBody,
  TableCell,
  TableContainer,
  TablePagination,
  TableRow,
  Typography,
} from '@mui/material';
// @mui
import { useTheme } from '@mui/material/styles';
import { sentenceCase } from 'change-case';
import { useEffect, useState } from 'react';
import HeaderBreadcrumbs from '../../components/HeaderBreadcrumbs';
import Iconify from '../../components/Iconify';
import Image from '../../components/Image';
import Label from '../../components/Label';
import LoadingScreen from '../../components/LoadingScreen';
// components
import Page from '../../components/Page';
import Scrollbar from '../../components/Scrollbar';
import SearchNotFound from '../../components/SearchNotFound';
// hooks
import useSettings from '../../hooks/useSettings';
import { getProducts } from '../../redux/slices/product';
// redux
import { useDispatch, useSelector } from '../../redux/store';
// routes
import { PATH_DASHBOARD } from '../../routes/paths';
// sections
import { ProductListHead, ProductListToolbar } from '../../sections/@dashboard/e-commerce/product-list';
// utils
import { fDate } from '../../utils/formatTime';

// ----------------------------------------------------------------------

const TABLE_HEAD = [
  { id: 'name', label: 'White URLs', alignRight: false },
  { id: 'createdAt', label: 'Updated at', alignRight: false },
  { id: 'inventoryType', label: 'Status', alignRight: false },
  { id: 'price', label: 'Link', alignRight: true },
  { id: '' },
];

// ----------------------------------------------------------------------
var white;
if (!localStorage.getItem('whiteList')) {
  getWhiteList();
  // alert('Wait Updating WhiteList!');
} else {
  white = JSON.parse(localStorage.getItem('whiteList'));
  // console.log(white);
}

export default function EcommerceProductList() {
  const { themeStretch } = useSettings();
  const theme = useTheme();
  const dispatch = useDispatch();
  const [whites, setWhite] = useState(white);
  const { products } = useSelector((state) => state.product);

  // eslint-disable-next-line
  const [productList, setProductList] = useState([]);
  const [page, setPage] = useState(0);
  // const [order, setOrder] = useState('asc');

  // const [selected, setSelected] = useState([]);
  const [filterName, setFilterName] = useState('');
  const [rowsPerPage, setRowsPerPage] = useState(5);
  // const [orderBy, setOrderBy] = useState('createdAt');

  useEffect(() => {
    dispatch(getProducts());
  }, [dispatch]);

  useEffect(() => {
    if (whites?.length) {
      setProductList(products);
    }
    // eslint-disable-next-line
  }, [products]);

  //! If White NULL
  if (white == null) return <LoadingScreen />;
  // const handleRequestSort = (property) => {
  //   const isAsc = orderBy === property && order === 'asc';
  //   setOrder(isAsc ? 'desc' : 'asc');
  //   setOrderBy(property);
  // };

  // const handleSelectAllClick = (checked) => {
  //   if (checked) {
  //     const selected = productList.map((n) => n.name);
  //     setSelected(selected);
  //     return;
  //   }
  //   setSelected([]);
  // };

  // const handleClick = (name) => {
  //   const selectedIndex = selected.indexOf(name);
  //   let newSelected = [];
  //   if (selectedIndex === -1) {
  //     newSelected = newSelected.concat(selected, name);
  //   } else if (selectedIndex === 0) {
  //     newSelected = newSelected.concat(selected.slice(1));
  //   } else if (selectedIndex === whites.length - 1) {
  //     newSelected = newSelected.concat(selected.slice(0, -1));
  //   } else if (selectedIndex > 0) {
  //     newSelected = newSelected.concat(selected.slice(0, selectedIndex), selected.slice(selectedIndex + 1));
  //   }
  //   setSelected(newSelected);
  // };

  const handleChangeRowsPerPage = (event) => {
    setRowsPerPage(parseInt(event.target.value, 10));
    setPage(0);
  };

  const handleFilterByName = (filterNames) => {
    const filterName = filterNames.toLowerCase().trim();
    setFilterName(filterName);
    // console.log(filterName);
    const dateWhite = JSON.parse(localStorage.getItem('whiteList'));
    const whiteSearchResult = dateWhite.filter((da) => {
      return da.url.includes(filterName);
    });
    // console.log(whiteSearchResult);
    setWhite(whiteSearchResult);
    // setBlack(blackSearchResult);
    setPage(0);
  };

  // const handleDeleteProduct = (productId) => {
  //   const deleteProduct = productList.filter((product) => product.id !== productId);
  //   setSelected([]);
  //   setProductList(deleteProduct);
  // };

  // const handleDeleteProducts = (selected) => {
  //   const deleteProducts = productList.filter((product) => !selected.includes(product.name));
  //   setSelected([]);
  //   setProductList(deleteProducts);
  // };

  const emptyRows = page > 0 ? Math.max(0, (1 + page) * rowsPerPage - whites.length) : 0;

  // const filteredProducts = applySortFilter(productList, getComparator(order, orderBy), filterName);

  const isNotFound = !whites.length && Boolean(filterName);

  return (
    <Page title="White Lists Public">
      <Container maxWidth={themeStretch ? false : 'lg'}>
        <HeaderBreadcrumbs
          heading="White List URLs"
          links={[
            { name: 'Dashboard', href: PATH_DASHBOARD.root },
            {
              name: 'E-Commerce',
              href: PATH_DASHBOARD.eCommerce.root,
            },
            { name: 'Product List' },
          ]}
        />

        <Card>
          <ProductListToolbar
            // numSelected={whites.length}
            filterName={filterName}
            onFilterName={handleFilterByName}
            setWhite={setWhite}
            // onDeleteProducts={() => handleDeleteProducts(selected)}
          />

          <Scrollbar>
            <TableContainer sx={{ minWidth: 800 }}>
              <Table>
                <ProductListHead
                  // order={order}
                  // orderBy={orderBy}
                  headLabel={TABLE_HEAD}
                  // rowCount={whites.length}
                  // numSelected={whites.length}
                  // onRequestSort={handleRequestSort}
                  // onSelectAllClick={handleSelectAllClick}
                />

                <TableBody>
                  {whites.slice(page * rowsPerPage, page * rowsPerPage + rowsPerPage).map((row) => {
                    const { _id, url, updatedAt } = row;
                    const inventoryType = 'Clean';
                    const cover = 'https://api.faviconkit.com/' + validURL(url) + '/144';
                    // const isItemSelected = selected.indexOf(url) !== -1;

                    return (
                      <TableRow
                        hover
                        key={_id}
                        tabIndex={-1}
                        role="checkbox"
                        // selected={isItemSelected}
                        // aria-checked={isItemSelected}
                      >
                        {/* <TableCell padding="checkbox">
                          <Checkbox checked={isItemSelected} onClick={() => handleClick(name)} />
                        </TableCell> */}
                        <TableCell sx={{ display: 'flex', alignItems: 'center' }} align="center">
                          <Image
                            disabledEffect
                            alt={url}
                            src={cover}
                            sx={{ borderRadius: 1.5, width: 64, height: 64, mr: 2 }}
                          />
                          <Typography variant="subtitle1" noWrap>
                            {url}
                          </Typography>
                        </TableCell>
                        <TableCell style={{ minWidth: 160 }}>{fDate(updatedAt)}</TableCell>
                        <TableCell style={{ minWidth: 160 }}>
                          <Label
                            variant={theme.palette.mode === 'light' ? 'ghost' : 'filled'}
                            color={
                              (inventoryType === 'Clean' && 'success') ||
                              (inventoryType === 'low_stock' && 'warning') ||
                              'success'
                            }
                          >
                            {inventoryType ? sentenceCase(inventoryType) : ''}
                          </Label>
                        </TableCell>
                        <TableCell align="right" style={{ minWidth: 100, maxWidth: 100 }}>
                          {/* {fCurrency(price)} */}
                          <a href={'http://' + url} target="_blank" rel="noreferrer">
                            <Button
                              // disabled={isMaxQuantity}
                              size="small"
                              color="warning"
                              variant="contained"
                              startIcon={<Iconify icon={'flat-color-icons:broken-link'} />}
                              // onClick={handleAddCart}
                              sx={{ whiteSpace: 'nowrap' }}
                            >
                              Access this
                            </Button>
                          </a>
                        </TableCell>

                        {/* <TableCell align="right">
                          <ProductMoreMenu />
                          
                        </TableCell> */}
                      </TableRow>
                    );
                  })}
                  {emptyRows > 0 && (
                    <TableRow style={{ height: 53 * emptyRows }}>
                      <TableCell colSpan={6} />
                    </TableRow>
                  )}
                </TableBody>

                {isNotFound && (
                  <TableBody>
                    <TableRow>
                      <TableCell align="center" colSpan={6}>
                        <Box sx={{ py: 3 }}>
                          <SearchNotFound searchQuery={filterName} />
                        </Box>
                      </TableCell>
                    </TableRow>
                  </TableBody>
                )}
              </Table>
            </TableContainer>
          </Scrollbar>

          <TablePagination
            rowsPerPageOptions={[5, 10, 25]}
            component="div"
            count={whites.length}
            rowsPerPage={rowsPerPage}
            page={page}
            onPageChange={(event, value) => setPage(value)}
            onRowsPerPageChange={handleChangeRowsPerPage}
          />
        </Card>
      </Container>
    </Page>
  );
}
function getWhiteList() {
  fetch('https://api3blockserver.herokuapp.com/db/api/system/3block/getAllWhitePublic', {
    method: 'GET',
    headers: { 'Content-Type': 'application/json' },
  })
    .then((response) => {
      return response.json();
    })
    .then((json) => {
      localStorage.setItem('whiteList', JSON.stringify(json));
      // enqueueSnackbar('Update White Lists Successfully!', { variant: 'success' });
      window.location.reload();
    });
}
function validURL(url) {
  var match;
  // eslint-disable-next-line
  if ((match = url.match(/^(?:https?:\/\/)?(?:[^@\n]+@)?(?:www\.)?([^:\/\n\?\=]+)/im))) {
    return match[1];
  }
}
// ----------------------------------------------------------------------

// function descendingComparator(a, b, orderBy) {
//   if (b[orderBy] < a[orderBy]) {
//     return -1;
//   }
//   if (b[orderBy] > a[orderBy]) {
//     return 1;
//   }
//   return 0;
// }

// function getComparator(order, orderBy) {
//   return order === 'desc'
//     ? (a, b) => descendingComparator(a, b, orderBy)
//     : (a, b) => -descendingComparator(a, b, orderBy);
// }

// function applySortFilter(array, comparator, query) {
//   const stabilizedThis = array.map((el, index) => [el, index]);
//   stabilizedThis.sort((a, b) => {
//     const order = comparator(a[0], b[0]);
//     if (order !== 0) return order;
//     return a[1] - b[1];
//   });

//   if (query) {
//     return array.filter((_product) => _product.name.toLowerCase().indexOf(query.toLowerCase()) !== -1);
//   }

//   return stabilizedThis.map((el) => el[0]);
// }
