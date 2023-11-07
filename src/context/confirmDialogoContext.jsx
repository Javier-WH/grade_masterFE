import { createContext, useState } from 'react';
import { ConfirmDialog } from 'primereact/confirmdialog';
import PropTypes from "prop-types";

export const ConfirmDialogContext = createContext(null);

export const ConfirmDialogProvider = ({ children }) => {
  const [visible, setVisible] = useState(false);
  const [header, setHeader] = useState('');
  const [icon, setIcon] = useState('');
  const [message, setMessage] = useState('');
  const [dialogCallback, setDialogCallback] = useState(null); 

  const showConfirmDialog = ({header, icon, message, action}) => {
    setHeader(header);
    setIcon(icon);
    setMessage(message);
    setVisible(true);
    setDialogCallback(action); 
  };


  return (
    <ConfirmDialogContext.Provider value={{ showConfirmDialog}}>
      {children}
      <ConfirmDialog
        visible={visible}
        onHide={() => setVisible(false)}
        message={message}
        header={header}
        icon={icon}
        acceptLabel='Si'
        rejectLabel='No'
        accept={()=> dialogCallback(true)}
        reject={()=> dialogCallback(false)}
      />
    </ConfirmDialogContext.Provider>
  );
};

ConfirmDialogProvider.propTypes = {
  children: PropTypes.node
};

ConfirmDialogProvider.propTypes = {
  children: PropTypes.node
};