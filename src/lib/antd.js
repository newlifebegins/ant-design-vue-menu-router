import Vue from "vue";
import {
    Button,
    Switch,
    message,
    notification,
    Modal,
    Layout,
    LocaleProvider,
    ConfigProvider,
    Badge,
    Icon,
    Dropdown,
    Avatar,
    Menu,
    List,
    Timeline,
    Row,
    Col,
    Carousel,
    Tabs,
    Card,
    Tag,
    Input,
    Select,
    Collapse,
    Table,
    Divider,
    Form,
    Anchor,
    Popover,
    Drawer,
    Upload,
    DatePicker,
    TimePicker,
    Radio,
    Tree,
    TreeSelect,
    Checkbox,
    Result,
    Empty,
    Breadcrumb,
    Pagination
} from "ant-design-vue";
Vue.use(Button)
    .use(Pagination)
    .use(Breadcrumb)
    .use(Switch)
    .use(Layout)
    .use(LocaleProvider)
    .use(ConfigProvider)
    .use(Badge)
    .use(Icon)
    .use(Dropdown)
    .use(Avatar)
    .use(Menu)
    .use(List)
    .use(Timeline)
    .use(Row)
    .use(Col)
    .use(Carousel)
    .use(Tabs)
    .use(Card)
    .use(Tag)
    .use(Input)
    .use(Select)
    .use(Collapse)
    .use(Table)
    .use(Divider)
    .use(Form)
    .use(Anchor)
    .use(Popover)
    .use(Drawer)
    .use(Modal)
    .use(Upload)
    .use(DatePicker)
    .use(TimePicker)
    .use(Radio)
    .use(Tree)
    .use(TreeSelect)
    .use(Checkbox)
    .use(Result)
    .use(Empty);
Vue.prototype.$message = message;
Vue.prototype.$notification = notification;
Vue.prototype.$info = Modal.info;
Vue.prototype.$success = Modal.success;
Vue.prototype.$error = Modal.error;
Vue.prototype.$warning = Modal.warning;
Vue.prototype.$confirm = Modal.confirm;
const IconFont = Icon.createFromIconfontCN({
    scriptUrl: "//at.alicdn.com/t/font_1913462_g8z7w5btb5j.js" // 在 iconfont.cn 上生成
});
Vue.component("icon-font", IconFont);