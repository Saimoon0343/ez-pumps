import {showMessage} from 'react-native-flash-message';

export const errorMessage = description => {
  showMessage({
    type: 'danger',
    icon: 'auto',
    message: 'Warning',
    description: description,
    floating: true,
    backgroundColor: 'gray',
    style: {alignItems: 'center'},
  });
};

export const successMessage = description => {
  showMessage({
    type: 'success',
    icon: 'auto',
    message: 'Success',
    description: description,
    floating: true,
    backgroundColor: 'green',
    style: {alignItems: 'center'},
  });
};
