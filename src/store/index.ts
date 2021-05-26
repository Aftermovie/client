import axios, { AxiosResponse } from "axios";
import {
  createStore,
  MutationTree,
  ActionContext,
  ActionTree,
  GetterTree,
  Store as VuexStore,
  CommitOptions,
  DispatchOptions,
  createLogger
} from "vuex";
import createPersistedState from 'vuex-persistedstate'
import jwt_decode from 'jwt-decode'

interface Credential {
  username: string;
  password: string;
}

//declare state
export type State = {
  name: string,
  username: string,
  userToken: string,
};

//set state
const state: State = {
  name: "",
  username: "",
  userToken: "",
};

// mutations and action enums

export enum MutationTypes {
  GET_JWT = "SET_JWT",
  DELETE_JWT = "REMOVE_JWT",
  GET_USERNAME = "GET_USERNAME"
}

export enum ActionTypes {
  GET_JWT = "SET_JWT",
  DELETE_JWT = "REMOVE_JWT",
  GET_USERNAME = "GET_USERNAME"
}

//Mutation Types
export type Mutations<S = State> = {
  [MutationTypes.GET_JWT](state: S, token: string): void;
  [MutationTypes.DELETE_JWT](state: S, credential: Credential): void;
  [MutationTypes.GET_USERNAME](state: S, name: string): void;
};

//define mutations
const mutations: MutationTree<State> & Mutations = {
  [MutationTypes.GET_JWT](state: State, token: string) {
    state.userToken = token
  },
  [MutationTypes.DELETE_JWT](state: State, credential: Credential) {
    state.userToken = ""
    state.username = ""
  },
  [MutationTypes.GET_USERNAME](state: State, name: string) {
    state.username = name
  },
};

//actions

type AugmentedActionContext = {
  commit<K extends keyof Mutations>(
    key: K,
    payload: Parameters<Mutations[K]>[1]
  ): ReturnType<Mutations[K]>;
} & Omit<ActionContext<State, State>, "commit">;

// actions interface

export interface Actions {
  [ActionTypes.GET_JWT](
    { commit }: AugmentedActionContext,
    payload: Credential
  ): void;
  [ActionTypes.DELETE_JWT](
    { commit }: AugmentedActionContext,
    payload: Credential
  ): void;
  [ActionTypes.GET_USERNAME](
    { commit }: AugmentedActionContext,
    payload: Credential
  ): void;
}

const SERVER_URL_LOGIN = `${process.env.VUE_APP_SERVER_URL}/accounts/api-token-auth/`

export const actions: ActionTree<State, State> & Actions = {
  async [ActionTypes.GET_JWT]({ commit }, credential: Credential) {
    console.log(credential)
    try {
      const response: AxiosResponse = await axios.post(SERVER_URL_LOGIN, credential)
      commit(MutationTypes.GET_JWT, response.data.token)
      // 이곳에서 내가 username은 state에 저장이 가능한데, name을 알아낼 방법이 없다.
      // 때문에 백엔드에서 데이터 보내주면 그걸 저장해야하는데 이때 받는 데이터에 username도 포함시켜주는지 확인하고 처리해야 겠다.
    }
    catch (err) {
      console.log(err)
    }
    // axios({
    //   method: 'post',
    //   url: SERVER_URL_LOGIN,
    //   data: credential
    // })
    //   .then((res: AxiosResponse) => {
    //     console.log('dainoanfanfalk')
    //     console.log(res)
    //     
    //     commit(MutationTypes.GET_JWT, res.data.token)
    //   })
    //   .catch((err) => {
    //     console.log(err)
    //   })
  },
  [ActionTypes.DELETE_JWT]({ commit }, credential: Credential) {
    commit(MutationTypes.DELETE_JWT, credential)
  },
  [ActionTypes.GET_USERNAME]({ commit }, credential: Credential) {
    commit(MutationTypes.GET_USERNAME, credential.username)
  }
};

// Getters types
export type Getters = {
  decodedToken(state: State): string | null;
};

//getters
export const getters: GetterTree<State, State> & Getters = {
  decodedToken: state => {
    // console.log("state", state.counter);
    if (state.userToken) {
      return jwt_decode(state.userToken)
    }
    else {
      return null
    }
  }
};

//setup store type
export type Store = Omit<
  VuexStore<State>,
  "commit" | "getters" | "dispatch"
> & {
  commit<K extends keyof Mutations, P extends Parameters<Mutations[K]>[1]>(
    key: K,
    payload: P,
    options?: CommitOptions
  ): ReturnType<Mutations[K]>;
} & {
  getters: {
    [K in keyof Getters]: ReturnType<Getters[K]>;
  };
} & {
  dispatch<K extends keyof Actions>(
    key: K,
    payload: Parameters<Actions[K]>[1],
    options?: DispatchOptions
  ): ReturnType<Actions[K]>;
};

export const store = createStore({
  state,
  mutations,
  actions,
  getters,
  plugins: [createLogger(), createPersistedState()]
});

export function useStore() {
  return store as Store;
}