// @mui
import { Container, Stack, TablePagination, Typography } from '@mui/material';
import { useEffect, useState } from 'react';
// form
import { useForm } from 'react-hook-form';
import HeaderBreadcrumbs from '../../components/HeaderBreadcrumbs';
import { FormProvider } from '../../components/hook-form';
import LoadingScreen from '../../components/LoadingScreen';
// components
import Page from '../../components/Page';
// hooks
import useSettings from '../../hooks/useSettings';
import { filterProducts, getProducts } from '../../redux/slices/product';
// redux
import { useDispatch, useSelector } from '../../redux/store';
// sections
import {
  ShopFilterSidebar,
  ShopProductList,
  ShopProductSearch,
  ShopTagFiltered,
} from '../../sections/@dashboard/e-commerce/shop';

// ----------------------------------------------------------------------
var blacks;
if (!localStorage.getItem('blackList')) {
  getBlackList();
  // alert('Wait Updating BlackList!');
} else {
  blacks = JSON.parse(localStorage.getItem('blackList'));
  // console.log(black);
}
export default function EcommerceShop() {
  var {
    products,
    // sortBy,
    filters,
  } = useSelector((state) => state.product);

  // const filteredProducts = applyFilter(products, sortBy, filters);
  const { themeStretch } = useSettings();

  const [page, setPage] = useState(0);
  const [rowsPerPage, setRowsPerPage] = useState(12);
  const [black, setBlack] = useState(blacks);
  const dispatch = useDispatch();

  const [openFilter, setOpenFilter] = useState(false);

  useEffect(() => {
    if (filters.gender.length === 0) {
      const newBlack = JSON.parse(localStorage.getItem('blackList'));
      if (black !== newBlack) {
        // console.log('Zero');
        setBlack(newBlack);
      }
    }
    // eslint-disable-next-line
  }, [filters.gender]);
  const defaultValues = {
    gender: filters.gender,
    category: filters.category,
    colors: filters.colors,
    priceRange: filters.priceRange,
    rating: filters.rating,
  };

  const methods = useForm({
    defaultValues,
  });

  const { reset, watch, setValue } = methods;

  const values = watch();

  const isDefault =
    !values.priceRange &&
    !values.rating &&
    values.gender.length === 0 &&
    values.colors.length === 0 &&
    values.category === 'All';

  useEffect(() => {
    dispatch(getProducts());
  }, [dispatch]);

  useEffect(() => {
    dispatch(filterProducts(values));
  }, [dispatch, values]);

  //! If Black NULL
  if (blacks == null) {
    return <LoadingScreen />;
  }

  const handleOpenFilter = () => {
    setOpenFilter(true);
  };

  const handleCloseFilter = () => {
    setOpenFilter(false);
  };

  const handleResetFilter = () => {
    reset();
    setBlack(JSON.parse(localStorage.getItem('blackList')));
    handleCloseFilter();
  };

  const handleRemoveGender = (value) => {
    // console.log(value + ' XXX');
    const newValue = filters.gender.filter((item) => item !== value);
    setValue('gender', newValue);
  };

  // const handleRemoveCategory = () => {
  //   setValue('category', 'All');
  // };

  // const handleRemoveColor = (value) => {
  //   const newValue = filters.colors.filter((item) => item !== value);
  //   setValue('colors', newValue);
  // };

  // const handleRemovePrice = () => {
  //   setValue('priceRange', '');
  // };

  // const handleRemoveRating = () => {
  //   setValue('rating', '');
  // };

  const handleChangeRowsPerPage = (event) => {
    setRowsPerPage(parseInt(event.target.value, 12));
    setPage(0);
  };

  return (
    <Page title="Black Lists Public">
      <Container maxWidth={themeStretch ? false : 'lg'}>
        <HeaderBreadcrumbs heading="Black List URLs" />

        <Stack
          spacing={2}
          direction={{ xs: 'column', sm: 'row' }}
          alignItems={{ sm: 'center' }}
          justifyContent="space-between"
          sx={{ mb: 2 }}
        >
          <ShopProductSearch black={black} setBlack={setBlack} setPage={setPage} gender={filters.gender} />

          <Stack direction="row" spacing={1} flexShrink={0} sx={{ my: 1 }}>
            <FormProvider methods={methods}>
              <ShopFilterSidebar
                onResetAll={handleResetFilter}
                isOpen={openFilter}
                onOpen={handleOpenFilter}
                onClose={handleCloseFilter}
              />
            </FormProvider>

            {/* <ShopProductSort /> */}
          </Stack>
        </Stack>

        <Stack sx={{ mb: 3 }}>
          {!isDefault && (
            <>
              <Typography variant="body2" gutterBottom>
                <strong>{black.length}</strong>
                &nbsp;Products found
              </Typography>

              <ShopTagFiltered
                filters={filters}
                isShowReset={!isDefault && !openFilter}
                onRemoveGender={handleRemoveGender}
                // onRemoveCategory={handleRemoveCategory}
                // onRemoveColor={handleRemoveColor}
                // onRemovePrice={handleRemovePrice}
                // onRemoveRating={handleRemoveRating}
                onResetAll={handleResetFilter}
                setBlack={setBlack}
                black={black}
                setPage={setPage}
              />
            </>
          )}
        </Stack>

        <ShopProductList
          black={black.slice(page * rowsPerPage, (page + 1) * rowsPerPage)}
          loading={!products.length && isDefault}
        />
        <TablePagination
          rowsPerPageOptions={[4, 8, 12]}
          component="div"
          count={black.length}
          rowsPerPage={rowsPerPage}
          page={page}
          onPageChange={(e, page) => setPage(page)}
          onRowsPerPageChange={handleChangeRowsPerPage}
        />
        {/* <CartWidget /> */}
      </Container>
    </Page>
  );
}

// ----------------------------------------------------------------------

// function applyFilter(products, sortBy, filters) {
//   // SORT BY
//   // if (sortBy === 'featured') {
//   //   products = orderBy(products, ['sold'], ['desc']);
//   // }
//   // if (sortBy === 'newest') {
//   //   products = orderBy(products, ['createdAt'], ['desc']);
//   // }
//   // if (sortBy === 'priceDesc') {
//   //   products = orderBy(products, ['price'], ['desc']);
//   // }
//   // if (sortBy === 'priceAsc') {
//   //   products = orderBy(products, ['price'], ['asc']);
//   // }
//   // FILTER PRODUCTS
//   if (filters.gender.length > 0) {
//     products = products.filter((product) => filters.gender.includes(product.gender));
//   }
//   // if (filters.category !== 'All') {
//   //   products = products.filter((product) => product.category === filters.category);
//   // }
//   // if (filters.colors.length > 0) {
//   //   products = products.filter((product) => product.colors.some((color) => filters.colors.includes(color)));
//   // }
//   // if (filters.priceRange) {
//   //   products = products.filter((product) => {
//   //     if (filters.priceRange === 'below') {
//   //       return product.price < 25;
//   //     }
//   //     if (filters.priceRange === 'between') {
//   //       return product.price >= 25 && product.price <= 75;
//   //     }
//   //     return product.price > 75;
//   //   });
//   // }
//   // if (filters.rating) {
//   //   products = products.filter((product) => {
//   //     const convertRating = (value) => {
//   //       if (value === 'up4Star') return 4;
//   //       if (value === 'up3Star') return 3;
//   //       if (value === 'up2Star') return 2;
//   //       return 1;
//   //     };
//   //     return product.totalRating > convertRating(filters.rating);
//   //   });
//   // }
//   return products;
// }
function getBlackList() {
  fetch('https://api3blockserver.herokuapp.com/db/api/system/3block/getAllBlackPublic', {
    method: 'GET',
    headers: { 'Content-Type': 'application/json' },
  })
    .then((response) => {
      return response.json();
    })
    .then((json) => {
      localStorage.setItem('blackList', JSON.stringify(json));
      window.location.reload();
    });
}
