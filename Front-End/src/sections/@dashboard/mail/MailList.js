import { Box, Divider } from '@mui/material';
// @mui
import { styled } from '@mui/material/styles';
import PropTypes from 'prop-types';
import { useEffect, useState } from 'react';
import { useParams } from 'react-router-dom';
import EmptyContent from '../../../components/EmptyContent';
//
import Scrollbar from '../../../components/Scrollbar';
import { getMails } from '../../../redux/slices/mail';
// redux
import { useDispatch, useSelector } from '../../../redux/store';
import MailItem from './MailItem';

// ----------------------------------------------------------------------

const RootStyle = styled('div')({
  flexGrow: 1,
  display: 'flex',
  overflow: 'hidden',
  flexDirection: 'column',
});

// ----------------------------------------------------------------------

MailList.propTypes = {
  onOpenSidebar: PropTypes.func,
};

export default function MailList({ onOpenSidebar, mail3Block }) {
  const params = useParams();

  const dispatch = useDispatch();

  const { mails } = useSelector((state) => state.mail);

  const [selectedMails, setSelectedMails] = useState([]);

  // eslint-disable-next-line
  const [dense, setDense] = useState(false);

  const isEmpty = mails.allIds.length < 1;

  useEffect(() => {
    dispatch(getMails(params));
  }, [dispatch, params]);

  // const handleSelectAllMails = () => {
  //   setSelectedMails(mails.allIds.map((mailId) => mailId));
  // };

  // const handleToggleDense = () => {
  //   setDense((prev) => !prev);
  // };

  // const handleDeselectAllMails = () => {
  //   setSelectedMails([]);
  // };

  const handleSelectOneMail = (mailId) => {
    setSelectedMails((prevSelectedMails) => {
      if (!prevSelectedMails.includes(mailId)) {
        return [...prevSelectedMails, mailId];
      }
      return prevSelectedMails;
    });
  };

  const handleDeselectOneMail = (mailId) => {
    setSelectedMails((prevSelectedMails) => prevSelectedMails.filter((id) => id !== mailId));
  };
  // console.log(mails);

  return (
    <RootStyle>
      {/* <MailToolbar
        mails={mails.allIds.length}
        selectedMails={selectedMails.length}
        onSelectAll={handleSelectAllMails}
        onOpenSidebar={onOpenSidebar}
        onDeselectAll={handleDeselectAllMails}
        onToggleDense={handleToggleDense}
      /> */}

      <Divider />

      {!isEmpty ? (
        <Scrollbar>
          <Box sx={{ minWidth: { md: 800 } }}>
            {mail3Block.map((mailInfo) => (
              <MailItem
                isCheck={mailInfo.isCheck}
                content={mailInfo.content}
                username={mailInfo.username}
                createdAt={mailInfo.createdAt}
                keys={mailInfo._id + 'asd'}
                key={mailInfo._id}
                isDense={dense}
                // mail={mails.byId[mailInfo._id]}
                isSelected={selectedMails.includes(mailInfo._id)}
                onSelect={() => handleSelectOneMail(mailInfo._id)}
                onDeselect={() => handleDeselectOneMail(mailInfo._id)}
              />
            ))}
          </Box>
        </Scrollbar>
      ) : (
        <EmptyContent
          title="There is no conversation"
          img="https://votuenam.github.io/image-hosting/illustration_empty_mail.svg"
          sx={{ flexGrow: 1, height: 'auto' }}
        />
      )}
    </RootStyle>
  );
}
