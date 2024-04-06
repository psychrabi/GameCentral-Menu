import { create } from 'zustand'
import { createJSONStorage, persist } from 'zustand/middleware'
import { createAuthSlice } from './AuthStore'
import { createDataSlice } from './DataStore'
import { createProductSlice } from './ProductStore'

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
