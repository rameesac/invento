import React, { Component } from 'react';
import { Switch, Route } from 'react-router-dom';
import classNames from 'classnames';
import { AppTopbar } from './AppTopbar';
import { AppMenu } from './AppMenu';
import { AppProfile } from './AppProfile';
import { Dashboard } from './components/Dashboard';

/* Pages */
import Categories from './components/pages/category/Categories';
import Suppliers from './components/pages/suppliers/Suppliers';
import Products from './components/pages/product/Products';
import Purchase from './components/pages/purchase/Purchase';
import StockMovement from './components/pages/stock-movement/StockMovement';
import StockLedger from './components/pages/stock-ledger/StockLedger';
import Stock from './components/pages/stock/Stock';
/* Pages */

import 'primereact/resources/themes/nova-light/theme.css';
import 'primereact/resources/primereact.min.css';
import 'primeicons/primeicons.css';
import 'primeflex/primeflex.css';
import '@fullcalendar/core/main.css';
import '@fullcalendar/daygrid/main.css';
import '@fullcalendar/timegrid/main.css';
import './layout/layout.scss';
import './App.scss';

class App extends Component {
    constructor() {
        super();
        this.state = {
            layoutMode: 'static',
            layoutColorMode: 'dark',
            staticMenuInactive: false,
            overlayMenuActive: false,
            mobileMenuActive: false
        };

        this.onWrapperClick = this.onWrapperClick.bind(this);
        this.onToggleMenu = this.onToggleMenu.bind(this);
        this.onSidebarClick = this.onSidebarClick.bind(this);
        this.onMenuItemClick = this.onMenuItemClick.bind(this);
        this.createMenu();
    }

    onWrapperClick(event) {
        if (!this.menuClick) {
            this.setState({
                overlayMenuActive: false,
                mobileMenuActive: false
            });
        }

        this.menuClick = false;
    }

    onToggleMenu(event) {
        this.menuClick = true;

        if (this.isDesktop()) {
            if (this.state.layoutMode === 'overlay') {
                this.setState({
                    overlayMenuActive: !this.state.overlayMenuActive
                });
            } else if (this.state.layoutMode === 'static') {
                this.setState({
                    staticMenuInactive: !this.state.staticMenuInactive
                });
            }
        } else {
            const mobileMenuActive = this.state.mobileMenuActive;
            this.setState({
                mobileMenuActive: !mobileMenuActive
            });
        }

        event.preventDefault();
    }

    onSidebarClick(event) {
        this.menuClick = true;
    }

    onMenuItemClick(event) {
        if (!event.item.items) {
            this.setState({
                overlayMenuActive: false,
                mobileMenuActive: false
            });
        }
    }

    createMenu() {
        this.menu = [
            {
                label: 'Dashboard',
                icon: 'pi pi-fw pi-home',
                to: '/'
            },
            {
                label: 'Catagories',
                icon: 'pi pi-fw pi-tags',
                to: '/catagories'
            },
            {
                label: 'Products',
                icon: 'pi pi-fw pi-mobile',
                to: '/products'
            },
            {
                label: 'Suppliers',
                icon: 'pi pi-fw pi-users',
                to: '/suppliers'
            },
            {
                label: 'Purchase',
                icon: 'pi pi-fw pi-money-bill',
                to: '/purchase'
            },
            {
                label: 'Stock Mangement',
                icon: 'pi pi-fw pi-bars',
                items: [
                    {
                        label: 'Stock',
                        icon: 'pi pi-fw pi-th-large',
                        to: '/stock'
                    },
                    {
                        label: 'Stock Movement',
                        icon: 'pi pi-fw pi-sort',
                        to: '/stock-movement'
                    },
                    {
                        label: 'Stock Ledger',
                        icon: 'pi pi-fw pi-file',
                        to: '/stock-ledger'
                    }
                ]
            }
        ];
    }

    addClass(element, className) {
        if (element.classList) element.classList.add(className);
        else element.className += ' ' + className;
    }

    removeClass(element, className) {
        if (element.classList) element.classList.remove(className);
        else
            element.className = element.className.replace(
                new RegExp(
                    '(^|\\b)' + className.split(' ').join('|') + '(\\b|$)',
                    'gi'
                ),
                ' '
            );
    }

    isDesktop() {
        return window.innerWidth > 1024;
    }

    componentDidUpdate() {
        if (this.state.mobileMenuActive)
            this.addClass(document.body, 'body-overflow-hidden');
        else this.removeClass(document.body, 'body-overflow-hidden');
    }

    render() {
        const logo =
            this.state.layoutColorMode === 'dark'
                ? 'assets/layout/images/logo-white.svg'
                : 'assets/layout/images/logo.svg';

        const wrapperClass = classNames('layout-wrapper', {
            'layout-overlay': this.state.layoutMode === 'overlay',
            'layout-static': this.state.layoutMode === 'static',
            'layout-static-sidebar-inactive':
                this.state.staticMenuInactive &&
                this.state.layoutMode === 'static',
            'layout-overlay-sidebar-active':
                this.state.overlayMenuActive &&
                this.state.layoutMode === 'overlay',
            'layout-mobile-sidebar-active': this.state.mobileMenuActive
        });

        const sidebarClassName = classNames('layout-sidebar', {
            'layout-sidebar-dark': this.state.layoutColorMode === 'dark',
            'layout-sidebar-light': this.state.layoutColorMode === 'light'
        });

        return (
            <div className={wrapperClass} onClick={this.onWrapperClick}>
                <AppTopbar onToggleMenu={this.onToggleMenu} />

                <div
                    ref={el => (this.sidebar = el)}
                    className={sidebarClassName}
                    onClick={this.onSidebarClick}
                >
                    <div className="layout-logo">
                        <div className="app-name">Invento</div>
                        <i className="pi pi-shopping-cart"></i>
                    </div>
                    <AppProfile />
                    <AppMenu
                        model={this.menu}
                        onMenuItemClick={this.onMenuItemClick}
                    />
                </div>

                <div className="layout-main">
                    <Switch>
                        <Route path="/" exact component={Dashboard} />
                        <Route path="/catagories" component={Categories} />
                        <Route path="/suppliers" component={Suppliers} />
                        <Route path="/products" component={Products} />
                        <Route path="/purchase" component={Purchase} />
                        <Route
                            path="/stock-movement"
                            component={StockMovement}
                        />
                        <Route path="/stock-ledger" component={StockLedger} />
                        <Route path="/stock" component={Stock} />
                    </Switch>
                </div>

                <div className="layout-mask"></div>
            </div>
        );
    }
}

export default App;
