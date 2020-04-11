import './index.less';

import React, { Component } from 'react';
import { Breadcrumb, Button, Dropdown, Menu } from 'antd';
import { Link } from 'dva/router';

/*
**  自定义面包屑组件
    this.props.params：{
        breadcrumbs:[       // 历史路径
            {   
                url,
                unResetParams
            }
        ],
        current: {          // 当前路径
            title,
        },
        dropdownList: [],   // 下拉菜单
        backRootUrl: ''     // 返回根路径,
        backRootKey: ''     // 返回根路径的尾缀
        showDropdownKey: '',        // 下拉菜单条目显示的KEY
    }
*/

export default class CustomBreadcrumb extends Component {
    constructor(props) {
        super(props);
    }

    getMenu(dropdownList, backRootUrl, backRootKey, showDropdownKey) {
        const showTitle = (item, _showDropdownKey) => {
            if (typeof _showDropdownKey == 'string') {
                return item[_showDropdownKey];
            }
            if (_showDropdownKey instanceof Array) {
                return _showDropdownKey.reduce((pre, next) => {
                    return pre[next];
                }, item);
            }
        };
        return (
            <Menu>
                {dropdownList ? (
                    dropdownList.map(item => {
                        return (
                            <Menu.Item key={`CustomBreadcrumb_menu_${item.id}`}>
                                <Link to={backRootUrl + item[backRootKey]}>
                                    {showTitle(item, showDropdownKey)}
                                </Link>
                            </Menu.Item>
                        );
                    })
                ) : (
                    ''
                )}
            </Menu>
        );
    }

    render() {
        const {
            breadcrumbs,
            current,
            dropdownList,
            backRootUrl,
            backRootKey,
            showDropdownKey
        } = this.props.params;
        const _menu = this.getMenu(
            dropdownList,
            backRootUrl,
            backRootKey,
            showDropdownKey
        );
        return (
            <div className="breadcrumb-box">
                <Breadcrumb className="bread-crumb">
                    {breadcrumbs.map((item, index) => {
                        return (
                            <Breadcrumb.Item key={`BreadcrumbItem${index}`}>
                                <Link
                                    to={
                                        item.url +
                                        '?unResetParams=' +
                                        item.unResetParams
                                    }
                                    className="highlight"
                                >
                                    {item.title}
                                </Link>
                            </Breadcrumb.Item>
                        );
                    })}
                    <Breadcrumb.Item>
                        {current.title}
                        <Dropdown
                            overlay={_menu}
                            placement="topCenter"
                            disabled={!dropdownList}
                        >
                            <Button
                                disabled={!dropdownList}
                                type="primary"
                                size="small"
                                ghost="true"
                                icon="right"
                                id={
                                    dropdownList ? (
                                        'breadcrumb-dropdown'
                                    ) : (
                                        'breadcrumb-dropdown-disabled'
                                    )
                                }
                            />
                        </Dropdown>
                    </Breadcrumb.Item>
                </Breadcrumb>
            </div>
        );
    }
}
