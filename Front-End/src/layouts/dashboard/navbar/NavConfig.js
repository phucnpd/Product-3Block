// routes
import SvgIconStyle from '../../../components/SvgIconStyle';
import { PATH_DASHBOARD } from '../../../routes/paths';

// ----------------------------------------------------------------------

const getIcon = (name) => <SvgIconStyle src={`/icons/${name}.svg`} sx={{ width: 1, height: 1 }} />;

const ICONS = {
  blog: getIcon('ic_blog'),
  cart: getIcon('ic_cart'),
  chat: getIcon('ic_chat'),
  mail: getIcon('ic_mail'),
  user: getIcon('ic_user'),
  kanban: getIcon('ic_kanban'),
  banking: getIcon('ic_banking'),
  calendar: getIcon('ic_calendar'),
  ecommerce: getIcon('ic_ecommerce'),
  analytics: getIcon('ic_analytics'),
  dashboard: getIcon('ic_dashboard'),
  booking: getIcon('ic_booking'),
};

const navConfig = [
  // GENERAL
  // ----------------------------------------------------------------------
  {
    subheader: 'general',
    items: [
      { title: 'Analytics URL', path: PATH_DASHBOARD.general.analytics, icon: ICONS.analytics },
      { title: 'URL detail', path: PATH_DASHBOARD.general.app, icon: ICONS.dashboard },
      { title: 'Check URL 18+', path: PATH_DASHBOARD.calendar, icon: ICONS.calendar },
    ],
  },
  {
    subheader: 'Public Information',
    items: [
      { title: 'Black List URLs', path: PATH_DASHBOARD.eCommerce.shop, icon: ICONS.ecommerce }, //PATH_DASHBOARD.general.ecommerce, icon: ICONS.ecommerce
      { title: 'White List URLs', path: PATH_DASHBOARD.eCommerce.list, icon: ICONS.banking }, //general.banking
    ],
  },
  {
    subheader: 'Communication',
    items: [
      { title: 'Forum suggest URLs', path: PATH_DASHBOARD.general.booking, icon: ICONS.booking },
      {
        title: 'messages',
        path: PATH_DASHBOARD.mail.root,
        icon: ICONS.mail,
      },
    ],
  },

  // MANAGEMENT
  // ----------------------------------------------------------------------
  //   {
  //     subheader: 'management',
  //     items: [
  //       // MANAGEMENT : USER
  //       {
  //         title: 'user',
  //         path: PATH_DASHBOARD.user.root,
  //         icon: ICONS.user,
  //         children: [
  //           { title: 'profile', path: PATH_DASHBOARD.user.profile },
  //           { title: 'cards', path: PATH_DASHBOARD.user.cards },
  //           { title: 'list', path: PATH_DASHBOARD.user.list },
  //           { title: 'create', path: PATH_DASHBOARD.user.newUser },
  //           { title: 'edit', path: PATH_DASHBOARD.user.editById },
  //           { title: 'account', path: PATH_DASHBOARD.user.account },
  //         ],
  //       },

  //       // MANAGEMENT : E-COMMERCE
  //       {
  //         title: 'e-commerce',
  //         path: PATH_DASHBOARD.eCommerce.root,
  //         icon: ICONS.cart,
  //         children: [
  //           { title: 'shop', path: PATH_DASHBOARD.general.ecommerce },
  //           { title: 'product', path: PATH_DASHBOARD.eCommerce.productById },
  //           { title: 'list', path: PATH_DASHBOARD.eCommerce.list },
  //           { title: 'create', path: PATH_DASHBOARD.eCommerce.newProduct },
  //           { title: 'edit', path: PATH_DASHBOARD.eCommerce.editById },
  //           { title: 'checkout', path: PATH_DASHBOARD.eCommerce.checkout },
  //           { title: 'invoice', path: PATH_DASHBOARD.eCommerce.invoice },
  //         ],
  //       },

  //       // MANAGEMENT : BLOG
  //       {
  //         title: 'blog',
  //         path: PATH_DASHBOARD.blog.root,
  //         icon: ICONS.blog,
  //         children: [
  //           { title: 'posts', path: PATH_DASHBOARD.blog.posts },
  //           { title: 'post', path: PATH_DASHBOARD.blog.postById },
  //           { title: 'new post', path: PATH_DASHBOARD.blog.newPost },
  //         ],
  //       },
  //     ],
  //   },

  //   // APP
  //   // ----------------------------------------------------------------------
  // {
  //   subheader: 'Contract',
  //   items: [
  //     {
  //       title: 'messages',
  //       path: PATH_DASHBOARD.mail.root,
  //       icon: ICONS.mail,
  //       // info: (
  //       //   <Label variant="outlined" color="error">
  //       //     +32
  //       //   </Label>
  //       // ),
  //     },
  //     // { title: 'chat', path: PATH_DASHBOARD.chat.root, icon: ICONS.chat },
  //     // { title: 'calendar', path: PATH_DASHBOARD.calendar, icon: ICONS.calendar },
  //     // {
  //     //   title: 'kanban',
  //     //   path: PATH_DASHBOARD.kanban,
  //     //   icon: ICONS.kanban,
  //     // },
  //   ],
  // },
];

export default navConfig;
