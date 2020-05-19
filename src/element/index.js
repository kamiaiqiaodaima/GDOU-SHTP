import Vue from 'vue';

import {
    Carousel,
    CarouselItem,
    Upload,
    Button,
    Form,
    FormItem,
    Input,
    Container,
    Main,
    Header,
    Loading,
    InfiniteScroll,
    Menu,
    MenuItem,
    Notification,
    Avatar,
    Card,
    PageHeader,
    Checkbox,
    CheckboxGroup,
    Select,
    Option,
    DatePicker,
    TimePicker,
    Row,
    Col,
    Submenu,
    Table,
    TableColumn,
    Pagination,
    Tag,
    MessageBox,
    Message
} from 'element-ui';

Vue.use(Carousel);
Vue.use(CarouselItem);
Vue.use(Upload);
Vue.use(Button);
Vue.use(Form);
Vue.use(FormItem);
Vue.use(Input);
Vue.use(Container);
Vue.use(Main);
Vue.use(Header);
Vue.use(Loading);
Vue.use(InfiniteScroll);
Vue.use(Menu);
Vue.use(MenuItem);
Vue.use(Avatar);
Vue.use(Card);
Vue.use(PageHeader);
Vue.use(Checkbox);
Vue.use(CheckboxGroup);
Vue.use(Select);
Vue.use(Option);
Vue.use(DatePicker);
Vue.use(TimePicker);
Vue.use(Row);
Vue.use(Col);
Vue.use(Submenu);
Vue.use(Table);
Vue.use(TableColumn);
Vue.use(Pagination);
Vue.use(Tag);
Vue.component(MessageBox);
Vue.prototype.$notify = Notification;
Vue.prototype.$prompt = MessageBox.prompt;
Vue.prototype.$message = Message;