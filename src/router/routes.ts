import { RouteRecordRaw } from 'vue-router'

const Home = () => import('@/pages/Home.vue')
const Settings = () => import('@/pages/Settings.vue')
const CreateTransaction = () => import('@/pages/CreateTransaction.vue')
const PendingTransactions = () => import('@/pages/PendingTransactions.vue')
const Wallet = () => import('@/pages/Wallet.vue')

const routes: RouteRecordRaw[] = [
  {
    path: "/",
    name: "Home",
    component: Home,
    meta: {
      hidden: true
    }
  },
  {
    path: "/settings",
    name: "Settings",
    component: Settings,
  },
  {
    path: "/transaction/create",
    name: "Create Transaction",
    component: CreateTransaction,
    meta: {
      button: true
    }
  },
  {
    path: "/transaction/pending",
    name: "Pending Transactions",
    component: PendingTransactions,
  },
  {
    path: "/wallet/:id",
    name: "Wallet",
    component: Wallet,
    props: true,
    meta: {
      hidden: true
    }
  }
]

export default routes
