import { create } from 'zustand'
import { createAuthSlice } from './AuthStore'
import { createProductSlice } from './ProductStore'
import { createDataSlice } from './DataStore'
import { persist, createJSONStorage } from 'zustand/middleware'

export const useBoundStore = create(
  persist(
    (...a) => ({
      ...createAuthSlice(...a),
      ...createProductSlice(...a),
      ...createDataSlice(...a)
    }),
    {
      name: 'bound-store',
      storage: createJSONStorage(() => sessionStorage)
    }
  )
)
