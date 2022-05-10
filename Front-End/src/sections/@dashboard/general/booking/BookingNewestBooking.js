import {
  // Avatar,
  Box,
  CardHeader,
  Paper,
  Stack,
  Typography,
} from '@mui/material';
// @mui
import { useTheme } from '@mui/material/styles';
import PropTypes from 'prop-types';
import { useRef } from 'react';
import Slider from 'react-slick';
import { CarouselArrows } from '../../../../components/carousel';
// components
import Label from '../../../../components/Label';
import { AppCurrentDownload } from '../app';
import MyAvatar from '../../../../components/MyAvatar';

// ----------------------------------------------------------------------
// var MostUsers = [
//   {
//     // avatar: 'https://votuenam.github.io/image-hosting/AvatarMember/Avatar1.jpg',
//     name: 'Võ Tuệ Nam',
//     roomType: 'success',
//     data: [50, 12, 3],
//   },
//   {
//     avatar: 'https://votuenam.github.io/image-hosting/AvatarMember/Avatar2.jpg',
//     name: 'Nguyễn Minh Long',
//     roomType: 'info',
//     data: [20, 13, 90],
//   },
//   {
//     avatar: 'https://votuenam.github.io/image-hosting/AvatarMember/Avatar3.jpg',
//     name: 'Nguyễn Tấn Vũ',
//     roomType: 'warning',
//     data: [10, 100, 23],
//   },
//   {
//     avatar: 'https://votuenam.github.io/image-hosting/AvatarMember/Avatar4.jpg',
//     name: 'Lê Quốc Thái',
//     roomType: 'info',
//     data: [12, 23, 33],
//   },
//   {
//     avatar: 'https://votuenam.github.io/image-hosting/AvatarMember/Avatar5.jpg',
//     name: 'Nguyễn Phạm Đình Phúc',
//     roomType: 'warning',
//     data: [33, 55, 1],
//   },
// ];

export default function BookingNewestBooking({ grayList }) {
  const theme = useTheme();
  const carouselRef = useRef(null);
  var MostUsers = calculateUser(grayList);
  if (MostUsers.length > 10) {
    MostUsers.slice(0, 10);
  }
  const settings = {
    dots: false,
    arrows: false,
    slidesToShow: 3,
    slidesToScroll: 1,
    rtl: Boolean(theme.direction === 'rtl'),
    responsive: [
      {
        breakpoint: theme.breakpoints.values.lg,
        settings: {
          slidesToShow: 3,
        },
      },
      {
        breakpoint: theme.breakpoints.values.md,
        settings: {
          slidesToShow: 2,
        },
      },
      {
        breakpoint: theme.breakpoints.values.sm,
        settings: {
          slidesToShow: 1,
        },
      },
    ],
  };

  const handlePrevious = () => {
    carouselRef.current?.slickPrev();
  };

  const handleNext = () => {
    carouselRef.current?.slickNext();
  };

  return (
    <Box sx={{ py: 2 }}>
      <CardHeader
        title="Most Contributing Users"
        subheader={MostUsers.length + ' Users'}
        action={
          <CarouselArrows
            customIcon={'ic:round-keyboard-arrow-right'}
            onNext={handleNext}
            onPrevious={handlePrevious}
            sx={{ '& .arrow': { width: 28, height: 28, p: 0 } }}
          />
        }
        sx={{
          p: 0,
          mb: 3,
          '& .MuiCardHeader-action': { alignSelf: 'center' },
        }}
      />

      <Slider ref={carouselRef} {...settings}>
        {MostUsers.map((item) => (
          <BookingItem key={item.name} item={item} />
        ))}
      </Slider>
    </Box>
  );
}

// ----------------------------------------------------------------------

BookingItem.propTypes = {
  item: PropTypes.shape({
    avatar: PropTypes.string,
    name: PropTypes.string,
    roomType: PropTypes.string,
    data: PropTypes.array,
  }),
};

function BookingItem({ item }) {
  const { avatar, name, roomType, data } = item;

  return (
    <Paper sx={{ mx: 1.5, borderRadius: 2, bgcolor: 'background.neutral' }}>
      <Stack spacing={2.5} sx={{ p: 3, pb: 2.5 }}>
        <Stack direction="row" alignItems="center" spacing={2}>
          {/* <Avatar alt={name} src={avatar} /> */}
          <MyAvatar gray={true} alt={name} src={avatar} />
          <div>
            <Typography variant="subtitle2">{name}</Typography>
            {/* <Typography variant="caption" sx={{ color: 'text.disabled', mt: 0.5, display: 'block' }}>
              {bookdAt}
            </Typography> */}
          </div>
        </Stack>

        {/* <Stack direction="row" alignItems="center" spacing={3} sx={{ color: 'text.secondary' }}>
          <Stack direction="row" alignItems="center" spacing={1}>
            <Iconify icon={'ic:round-vpn-key'} width={16} height={16} />
            <Typography variant="caption">Room {roomNumber}</Typography>
          </Stack>

          <Stack direction="row" alignItems="center" spacing={1}>
            <Iconify icon={'eva:people-fill'} width={16} height={16} />
            <Typography variant="caption">{person} Person</Typography>
          </Stack>
        </Stack> */}
      </Stack>

      <Box sx={{ p: 1, position: 'relative' }}>
        <Label
          variant="filled"
          color={roomType}
          sx={{
            right: 16,
            zIndex: 9,
            bottom: 370,
            position: 'absolute',
            textTransform: 'capitalize',
          }}
        >
          {(() => {
            if (roomType === 'info') {
              return 'None';
            }
            if (roomType === 'success') {
              return 'Verification';
            }
            if (roomType === 'warning') {
              return 'Reject';
            }
            return roomType;
          })()}
        </Label>
        <AppCurrentDownload data={data} />
        {/* <Image src={cover} ratio="1/1" sx={{ borderRadius: 1.5 }} /> */}
      </Box>
    </Paper>
  );
}
function calculateUser(grayOfList) {
  //todo Get Name + Image --> new List Obj
  const setNameImage = new Set();
  // eslint-disable-next-line
  grayOfList.map((nameImage) => {
    setNameImage.add(
      JSON.stringify({
        name: nameImage.user,
        avatar: nameImage.image,
      })
    );
  });
  // console.log(setNameImage);
  const listNameImage = [...setNameImage];
  for (let i in listNameImage) {
    listNameImage[i] = JSON.parse(listNameImage[i]);
    listNameImage[i].true = 0;
    listNameImage[i].false = 0;
    listNameImage[i].none = 0;
  }
  // eslint-disable-next-line
  grayOfList.map((dataIsCheck) => {
    // eslint-disable-next-line
    listNameImage.map((listIsCheck) => {
      if (dataIsCheck.user === listIsCheck.name && dataIsCheck.image === listIsCheck.avatar) {
        listIsCheck[dataIsCheck.isCheck]++;
      }
    });
  });
  for (let i in listNameImage) {
    listNameImage[i].data = [listNameImage[i].true, listNameImage[i].false, listNameImage[i].none];
    const maxArray = Math.max(...listNameImage[i].data);
    if (listNameImage[i].true === maxArray) {
      listNameImage[i].roomType = 'success';
    } else if (listNameImage[i].false === maxArray) {
      listNameImage[i].roomType = 'warning';
    } else if (listNameImage[i].none === maxArray) {
      listNameImage[i].roomType = 'info';
    }
  }
  return listNameImage;
}
