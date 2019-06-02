import { toast } from 'react-toastify';
import { debounce } from './app.helper';
import ls from './localstorage.helper';

export const EDITOR_STATUS = {
  UPDATED: 'code updated',
  WAITING: 'waiting for changes',
  ERROR: 'invalid json',
  VALIDATING: 'validating',
};

export const getStatusColor = (status) => {
  switch (status) {
    case EDITOR_STATUS.WAITING:
      return 'blue';
    case EDITOR_STATUS.ERROR:
      return 'red';
    case EDITOR_STATUS.VALIDATING:
      return 'yellow';
    case EDITOR_STATUS.UPDATED:
      return 'green';
    default:
      return undefined;
  }
};

const STORED_TOOLS_KEY = 'rr-ls-tools-key';

export const saveTools = (tools) => {
  if (!tools.autoSave) {
    toast(' ⚠️ Auto save to local storage is now off!', { toastId: 'rrtrlsoff', position: 'top-right', autoClose: false });
  } else {
    toast(' 💾 Auto save to local storage is now on!', { toastId: 'rrtrlson', position: 'top-right' });
  }
  if (ls.setItem(STORED_TOOLS_KEY, tools)) {
    debounce(() => toast(' 💾 saved to localStorage...', { toastId: 'rrtresumesaved', position: 'top-right' }),
      100,
      false,
      'rrtresumesaved');
  } else {
    debounce(() => toast(' ⚠️ error saving to localStorage...', { toastId: 'rrterrorsaveresume', position: 'top-right' }),
      100,
      false,
      'rrterrorsaveresume');
  }
  return tools;
};

export const loadTools = () => ls.getItem(STORED_TOOLS_KEY);
