import appConfig from "src/config/app";
import {useApp} from "src/composables/useApp";
import {api} from "boot/axios";

export default function useApi() {
  const {table_default_rows} = appConfig;
  const {token, user, isAuthenticated} = useApp();
  let apiHeader = {
    "Content-Type": "application/json",
  }

  const init = async () => {
    if (isAuthenticated.value && token.value) {
      api.defaults.headers.common["Authorization"] = `Bearer ${token.value}`
    }
    api.defaults.headers.post["Content-Type"] = "application/json";
  }

  const sendResponse = (code, message = '') => {
    return {
      success: code === 200,
      message: message,
    }
  }

  const download = async (url, callback) => {
    try {
      return await api.get(url, {
        responseType: 'blob',
      })
    } catch (error) {
      return error;
    }

  }

  const login = async (credentials) => {
    let data = null;
    try {
      const {identity, password} = credentials;
      const result = await api.post('/login', {identity, password});
      if (result?.status === 200 && result?.data) {
        data = result?.data;
      }
      return data || result;
    } catch (error) {
      return error;
    }
  }

  const refresh = async () => {
    try {
      return await api.post('/refresh');
    } catch (error) {
      return error?.message || error;
    }
  }

  const logout = async () => {
    try {
      await api.post('/logout');

    } catch (error) {
      return error?.message || error;
    }
  }

  const profile = async () => {
    try {
      return await api.get('/profile');
    } catch (error) {
      return error?.message || error;
    }
  }

  const get = async (url, params = null) => {
    try {
      let requestUrl = `${url}`;
      let data = params ? {...params} : {}
      return await api.get(requestUrl, {params: data});
    } catch (error) {
      return error?.message || error;
    }
  }

  const list = async (url, params = null) => {
    try {
      let requestUrl = `${url}`;
      let data = params ? {...params} : {}
      return await api.get(requestUrl, {params: data});
    } catch (error) {
      return error?.message || error;
    }
  }

  const view = async (url, id, params = null) => {
    try {
      let requestUrl = `${url}/${id}`;
      return await api.get(requestUrl, {params: params});
    } catch (error) {
      return error?.message || error;
    }
  }

  const create = async (url, data, config) => {
    try {
      let requestUrl = `${url}`;
      let $config = config || {};
      return await api.post(requestUrl, data, {...$config});
    } catch (error) {
      return error?.message || error;
    }
  }

  const post = async (url, data, config = null) => {
    try {
      let requestUrl = `${url}`;
      let $config = config || {};
      return await api.post(requestUrl, data, {...$config});
    } catch (error) {
      return error?.message || error;
    }
  }

  const update = async (url, id, data, config = null) => {
    try {
      let requestUrl = `${url}/${id}`;
      let $config = config || {};
      return await api.put(requestUrl, data, {...$config});
    } catch (error) {
      return error?.message || error;
    }
  }

  const patch = async (url, id, data, config = null) => {
    try {
      let requestUrl = `${url}/${id}`;
      let $config = config || {};
      return await api.patch(requestUrl, data, {...$config});
    } catch (error) {
      return error?.message || error;
    }
  }

  const put = async (url, id, data, config = null) => {
    try {
      let requestUrl = `${url}/${id}`;
      let $config = config || {};
      return await api.patch(requestUrl, data, {...$config});
    } catch (error) {
      return error?.message || error;
    }
  }

  const destroy = async (url, id, config = null) => {
    try {
      let requestUrl = `${url}/${id}`;
      let $config = config || {};
      return await api.delete(requestUrl, {...$config});
    } catch (error) {
      return error?.message || error;
    }
  }

  init()

  return {
    table_default_rows,
    login,
    logout,
    profile,
    list,
    view,
    create,
    update,
    destroy


  }
}
