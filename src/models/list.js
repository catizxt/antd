import { queryFakeList } from '@/services/test'

export default {
    namespace: 'list',
    state: {
        list: [],
    },

    effects: {    
        *fetch({ payload }, { call, put }) {
            const response = yield call(queryFakeList, payload)
            yield put({
                type: 'queryList',   
                payload: Array.isArray(response) ? response : [],
            })
        },
      },
    reducers: {
        queryList(state, action) {
            return {
                ...state,
                list: action.payload,   
            }
        },
}
}
