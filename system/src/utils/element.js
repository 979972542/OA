import Vue from 'vue'
import 'element-ui/lib/theme-chalk/index.css';
import {
    Menu,
    Button,
    Submenu,
    MenuItem,
    MenuItemGroup,
    Breadcrumb,
    BreadcrumbItem,
    Table,
    Col,
    Form,
    Select,
    Pagination,
    Option,
    FormItem,
    Loading,
    Dropdown,
    DropdownMenu,
    DropdownItem,
    Checkbox,
    MessageBox,
    CheckboxGroup,
    TableColumn,
    Dialog,
    Input,
    DatePicker,
    Switch,
    Row,
    Message
} from 'element-ui'

Vue.prototype.$ELEMENT = { size: 'mini' };
Vue.use(Dropdown);
Vue.use(DropdownMenu);
Vue.use(DropdownItem);
Vue.use(Menu);
Vue.use(Submenu);
Vue.use(Checkbox);
Vue.use(Col);
Vue.use(Pagination);
Vue.use(MenuItem);
Vue.use(Form);
Vue.use(Switch);
Vue.use(Row);
Vue.use(Select);
Vue.use(DatePicker);
Vue.use(Option);
Vue.use(CheckboxGroup);
Vue.use(Input);
Vue.use(FormItem);
Vue.use(Dialog);
Vue.use(Loading.directive);
Vue.use(MenuItemGroup);
Vue.use(Breadcrumb);
Vue.use(BreadcrumbItem);
Vue.use(TableColumn);
Vue.use(Button);
Vue.use(Table);

Vue.prototype.$message = Message;
Vue.prototype.$loading = Loading.service;
Vue.prototype.$msgbox = MessageBox;
Vue.prototype.$alert = MessageBox.alert;
Vue.prototype.$confirm = MessageBox.confirm;
Vue.prototype.$prompt = MessageBox.prompt;