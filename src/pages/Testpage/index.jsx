import React, { PureComponent } from 'react';

import { connect } from 'dva';

@connect(({ list, loading }) => ({
  list,
  loading: loading.models.list,
}))
class CardList extends PureComponent {
  componentDidMount() {
    const { dispatch } = this.props;
    dispatch({
      type: 'list/fetch',   
      payload: {
        count: 8,
      },
    });
  }
}
