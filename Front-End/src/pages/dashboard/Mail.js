import { useEffect, useState } from 'react';
import { useParams } from 'react-router-dom';
// @mui
import { Container, Card } from '@mui/material';
// redux
import { useDispatch } from '../../redux/store';
import { getLabels } from '../../redux/slices/mail';
// routes
import { PATH_DASHBOARD } from '../../routes/paths';
// hooks
import useSettings from '../../hooks/useSettings';
// components
import Page from '../../components/Page';
import HeaderBreadcrumbs from '../../components/HeaderBreadcrumbs';
import { MailList, MailDetails, MailSidebar, MailCompose } from '../../sections/@dashboard/mail';
import LoadingScreen from '../../components/LoadingScreen';

// ----------------------------------------------------------------------

export default function Mail() {
  const [mail3Block, setMail3Block] = useState(JSON.parse(localStorage.getItem('messageList')));

  // console.log(mail3Block);

  // console.log(listMail3Block);
  // setMail3Block(listMail3Block);
  const { themeStretch } = useSettings();
  const dispatch = useDispatch();
  const { mailId } = useParams();
  const [openSidebar, setOpenSidebar] = useState(false);
  const [openCompose, setOpenCompose] = useState(false);

  useEffect(() => {
    dispatch(getLabels());
  }, [dispatch]);

  useEffect(() => {
    getMail();
    // if (mail3Block == null) {
    //   setTimeout(() => {
    //     window.location.reload();
    //   }, 2000);
    // }
    // eslint-disable-next-line
  }, []);
  if (mail3Block == null) {
    return <LoadingScreen />;
  }
  return (
    <Page title="Message">
      <Container maxWidth={themeStretch ? false : 'xl'}>
        <HeaderBreadcrumbs
          heading="Send messages to Admin"
          links={[
            {
              name: 'Dashboard',
              href: PATH_DASHBOARD.root,
            },
            { name: 'Mail' },
          ]}
        />
        <Card sx={{ height: { md: '72vh' }, display: { md: 'flex' } }}>
          <MailSidebar
            sizeMail={mail3Block.length}
            isOpenSidebar={openSidebar}
            onCloseSidebar={() => setOpenSidebar(false)}
            onOpenCompose={() => setOpenCompose(true)}
          />
          {mailId ? <MailDetails /> : <MailList mail3Block={mail3Block} onOpenSidebar={() => setOpenSidebar(true)} />}
          {/* Nút soạn mail */}
          <MailCompose getMail={getMail} isOpenCompose={openCompose} onCloseCompose={() => setOpenCompose(false)} />
        </Card>
      </Container>
    </Page>
  );
  function getMail() {
    fetch('https://api3blockserver.herokuapp.com/api/3block/system/getMessage', {
      method: 'GET',
      headers: { 'Content-Type': 'application/json' },
    })
      .then((response) => {
        return response.json();
      })
      .then((json) => {
        // console.log('Call API');
        const userLocal = JSON.parse(localStorage.getItem('user'));
        const listDisplay = JSON.parse(localStorage.getItem('displayName'));
        if (userLocal != null && userLocal?.email) {
          for (let i of listDisplay) {
            if (i.email === userLocal.email) {
              userLocal.displayName = i.displayName;
            }
          }
        }
        const checkDisplayName = userLocal?.displayName;
        const checkEmail = userLocal?.email;
        const listMail3Block = json.filter((dataMail) => {
          return dataMail.username === checkDisplayName || dataMail.username === checkEmail;
          // return true
        });
        localStorage.setItem('messageList', JSON.stringify(listMail3Block));
        setMail3Block(JSON.parse(localStorage.getItem('messageList')));
      })
      .catch((err) => {
        console.log('fail');
      });
  }
}
