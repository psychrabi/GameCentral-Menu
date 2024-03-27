import axiosClient from '../../lib/axios-client'
import { updateData, submitData } from '../../utils/fetchData'

export const createAuthSlice =
  (set, get) => ({
    alert: null,
    center_id: null,
    center_name: null,
    loading: false,
    member: null,
    messages: null,
    session: null,
    sessionType: null,
    settings: null,
    show: false,
    start_time: null,
    subscription: '',
    systeminfo: null,
    token: null,
    type: '',
    sessions: [],
    authenticate: async (username, password) => {
      set({ loading: true })
      try {
        const payload = { username, password }
        const { data, status } = await axiosClient.post('/members/login', payload)

        if (status === 200) {
          const { member, session, token, sessions } = data
          const sessionType = member.balance > 0 || member.bonus_balance > 0 ? 'balance' : 'credit'
          if (sessionType === 'credit' && !window.confirm('Do you want to continue on credit?')) {
            set({ messages: 'Not enough balance. Please top up your account.', alert: 'danger', loading: false })
            return
          }
          if (member.credit > 30) {
            set({
              messages: `You have ${member.credit} credit to be paid. Please pay it first.`,
              alert: 'info',
              loading: false
            })
            return
          }
          set({
            loading: false,
            member,
            session,
            token,
            start_time: Date.parse(session.start_time),
            messages: 'You have successfully logged in.', alert: 'success',
            sessionType,
            sessions
          })

          const localStorageItems = {
            token,
            member,
            session,
            start_time: Date.parse(session.start_time),
            sessionType,
            sessions
          }

          Object.entries(localStorageItems).forEach(([key, value]) => {
            localStorage.setItem(key, JSON.stringify(value))
          })
        }
      } catch (err) {
        set({ messages: 'Provided username or password is incorrect', loading: false, alert: 'danger' });
      }
    },
    authenticateAdmin: async (license, username, password) => {
      set({ loading: true })
      try {
        const { data } = await axiosClient.post('/login', { license, username, password });
        const { id, center_name } = data.user;

        set({
          alert: 'success',
          center_id: id,
          center_name,
          loading: false,
          messages: 'Center Account set successfully.',
        });

        localStorage.setItem('center_id', JSON.stringify(id));
        localStorage.setItem('center_name', JSON.stringify(center_name));
      } catch (err) {
        set({ messages: 'Failed to login', loading: false, alert: 'danger' });
      }
    },
    registerMember: async (username, password, password_confirmation, email) => {
      set({ loading: true })
      try {
        const payload = {
          center_id: get().center_id,
          email,
          username,
          password,
          password_confirmation
        }
        const response = await axiosClient.post('/members/signup', payload)
        const { user, token, settings } = response.data
        const localStorageItems = {
          token,
          center_id: user.id,
          center_name: user.center_name,
          settings: settings
        }

        set({
          loading: false,
          messages: 'Account registration successful',
          alert: 'success',
          center_id: user.id,
          center_name: user.center_name,
          settings: [settings]
        })

        Object.entries(localStorageItems).forEach(([key, value]) => {
          localStorage.setItem(key, JSON.stringify(value))
        })
      } catch (err) {
        set({ messages: 'Failed to login', loading: false, alert: 'danger' })
      }
    },
    updateMember: async (id, payload) => {
      set({ loading: true });
      try {
        const { data } = await updateData(`/members/${id}`, get().token, payload);
        set({ member: data });
        localStorage.setItem('member', JSON.stringify(data));
        set({ loading: false, messages: 'Your profile is successfully updated.', alert: 'success' });
      } catch (err) {
        set({ messages: err.response.data.message, loading: false, alert: 'danger' });
      }
    },
    reset: () => {
      set({ member: null, session: null, sessionType: null, start_time: null, token: null, sessions: null, favoriteGames: null })
    },
    checkSession: () => {
      ['token', 'member', 'start_time', 'session', 'sessionType'].forEach(key => {
        const item = localStorage.getItem(key);
        if (item) {
          set({ [key]: key === 'token' ? JSON.parse(item).token : JSON.parse(item) });
        }
      });
    },
    checkSystemInfo: async () => {
      let systeminfo = localStorage.getItem('systemInfo');
      if (systeminfo) {
        systeminfo = JSON.parse(systeminfo);
      } else {
        try {
          const info = await window.api.getSystemInfo();
          systeminfo = {
            cpu: info.cpu.manufacturer + ' ' + info.cpu.brand,
            graphics: info.graphics.controllers.find((controller) => controller.vram > 0).model,
            ram: (info.mem.total / (1024 * 1024 * 1024)).toFixed(2) + 'GB',
            os: info.osInfo.distro + ' build ' + info.osInfo.build,
            ip4: info.networkInterfaces[0].ip4
          };
          localStorage.setItem('systemInfo', JSON.stringify(systeminfo));
        } catch (error) {
          console.log(error);
          set({ message: error, alert: 'danger ' });
          return;
        }
      }
      set({ systeminfo });
    },
    checkCenterID: () => {
      const centerId = localStorage.getItem('center_id');
      const centerName = localStorage.getItem('center_name');

      if (centerId) set({ center_id: JSON.parse(centerId) });
      if (centerName) set({ center_name: JSON.parse(centerName) });

      return !!(centerId && centerName);
    },
    setMessages: (messages) => set({ messages }),
    setType: (type) => set({ type })
    // updatePassword: async (id, newPassword) => {
    //   set({ loading: true })
    //   try {
    //     const data = await updateData(`/members/${id}`, newPassword)
    //     console.log(data)
    //     set({
    //       loading: false,
    //       error: null,
    //       member: updatedMember
    //     })
    //     localStorage.setItem('member', JSON.stringify(get().member))
    //   } catch (err) {
    //     set({ error: err.response.data.message, loading: false })
    //   }
    // }
  })
