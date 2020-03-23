const fs = require('fs');

const args = process.argv.slice(2);

/**
 * pascal case
 * @param {} string
 */
function p(s) {
  return s.replace(/(\w)(\w*)/g,
    function (g0, g1, g2) { return g1.toUpperCase() + g2.toLowerCase(); });
}

function makeDirs(storeName) {
  fs.mkdirSync(`./${storeName}`, { recursive: true });
  fs.mkdirSync(`./${storeName}/structure`, { recursive: true });
  fs.mkdirSync(`./${storeName}/structure/types`, { recursive: true });
}

function generate(s) {
  makeDirs(s);

  fs.writeFileSync(
    `../models/${p(s)}.ts`, `export interface ${p(s)} {
  id: number
}
    
export const GET_${s.toUpperCase()}S_URL = '${s}s'`)

  fs.writeFileSync(
    `./${s}/${p(s)}Context.tsx`, `import React, { createContext, useReducer } from 'react'
import { ${p(s)}Store, ${p(s)}State } from './structure/types'
import { ${s}Reducer } from './structure/reducer'
import { getters } from './structure/getters'
import { initActions } from './structure/actions'
import { AxiosError } from 'axios'

const initialStore: ${p(s)}Store = {
  state: {
    isLoading: false,
    error: {} as AxiosError,
    ${s}s: []
  } as ${p(s)}State,
  getters: {
    postsReversed: []
  },
  mutations: {
    commit: () => {}
  },
  actions: {
    dispatch: () => {}
  }
}

export const ${p(s)}Context = createContext<${p(s)}Store>(initialStore)

export const ${p(s)}ContextProvider: React.FC = (props) => {
  const [state, commit] = useReducer(${s}Reducer, initialStore.state)
  const store: ${p(s)}Store = {
    state,
    getters: getters(state),
    actions: {
      dispatch: initActions(commit)
    },
    mutations: {
      commit
    }
  }

  return (
    <${p(s)}Context.Provider value={store}>
      {props.children}
    </${p(s)}Context.Provider>
  )
}`)

  fs.writeFileSync(
    `./${s}/structure/reducer.ts`, `import { ${p(s)}State } from './types'
import { ${p(s)}Mutations } from './types'    

export function ${s}Reducer(state: ${p(s)}State, mutation: ${p(s)}Mutations): ${p(s)}State {
  switch (mutation.type) {
    case 'set-loading':
      return { ...state, isLoading: mutation.isLoading }
    case 'set-error':
      return { ...state, error: mutation.error }
    case 'set-${s}s':
      return { ...state, ${s}s: [...state.${s}s, ...mutation.${s}s] }
    case 'add-${s}':
      return { ...state, ${s}s: [...state.${s}s, mutation.${s}] }
    default:
      return state
  }
}`)

  fs.writeFileSync(
    `./${s}/structure/mutations.ts`, `import { ${p(s)} } from '../../../models/${p(s)}'
import { AxiosError } from 'axios'
    
export const setLoading = (isLoading: boolean) => ({
  type: 'set-loading',
  isLoading
} as const);
    
export const setError = (error: AxiosError) => ({
  type: 'set-error',
  error
} as const)
    
export const set${p(s)}s = (${s}s: ${p(s)}[]) => ({
  type: 'set-${s}s',
  ${s}s
} as const);
    
export const add${p(s)} = (${s}: ${p(s)}) => ({
  type: 'add-${s}',
  ${s}
} as const);`)
    
  fs.writeFileSync(
    `./${s}/structure/getters.ts`, `import { ${p(s)}State, ${p(s)}Getters } from "./types"

export const getters = (state: Readonly<${p(s)}State>): ${p(s)}Getters => {
  return {
    ${s}sReversed: [...state.${s}s].reverse()
  }
}`)

fs.writeFileSync(
  `./${s}/use${p(s)}Store.ts`, `import { useContext } from 'react'
import { ${p(s)}Context } from './${p(s)}Context'

const use${p(s)}Store = () => {
  return useContext(${p(s)}Context)
}

export default use${p(s)}Store`)


  fs.writeFileSync(
    `./${s}/structure/types/index.ts`, `import { ${p(s)} } from "../../../../models/${p(s)}"
import { DispatchType } from '../../../../util/types'
import { setLoading, set${p(s)}s, setError, add${p(s)} } from '../mutations'
import { load${p(s)}s } from '../actions'
import { AxiosError } from "axios"

export interface ${p(s)}Store {
  state: Readonly<${p(s)}State>
  getters: ${p(s)}Getters
  actions: {
    dispatch: React.Dispatch<${p(s)}Actions>
  }
  mutations: {
    commit: React.Dispatch<${p(s)}Mutations>
  }
}

export interface ${p(s)}State {
  isLoading: boolean
  error: AxiosError
  ${s}s: ${p(s)}[]
}

export interface ${p(s)}Getters {
  ${s}sReversed: ${p(s)}[]
} 

export type ${p(s)}Actions = 
  | DispatchType<typeof load${p(s)}s>

export type ${p(s)}Mutations =
  | DispatchType<typeof setLoading>
  | DispatchType<typeof setError>
  | DispatchType<typeof set${p(s)}s>
  | DispatchType<typeof add${p(s)}>`)

  fs.writeFileSync(
    `./${s}/structure/actions.ts`, `import { ${p(s)}Mutations, ${p(s)}Actions } from "./types"
import axios, { AxiosResponse } from 'axios'
import { GET_${s.toUpperCase()}S_URL, ${p(s)} } from "../../../models/${p(s)}"
import { API_BASE_URL } from "../../../util/utils"

export const load${p(s)}s = () => ({
  type: 'load-${s}s'
} as const);

export const initActions = (commit: React.Dispatch<${p(s)}Mutations>) => {
  const dispatch: React.Dispatch<${p(s)}Actions> = async (action) => {
    switch (action.type) {
      case 'load-${s}s':
        try {
          commit({ type: 'set-loading', isLoading: true })
          const res: AxiosResponse<${p(s)}[]> = await axios.get(\`\${API_BASE_URL}\${GET_${s.toUpperCase()}S_URL}\`)

          if (res.status === 200) {
            const ${s}s: ${p(s)}[] = res.data.map((api${p(s)}) => ({
              id: api${p(s)}.id
            }))

            commit({ type: 'set-${s}s', ${s}s })
          }
        } catch (error) {
          commit({ type: 'set-error', error })
        } finally {
          commit({ type: 'set-loading', isLoading: false })
        }
        break;
        
      default:
        break;
    }
  }

  return dispatch
}`)

}

generate(args[0]);