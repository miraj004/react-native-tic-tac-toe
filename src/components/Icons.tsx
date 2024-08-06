import Icon from 'react-native-vector-icons/FontAwesome';

import {PropsWithChildren} from 'react';

type IconProp = PropsWithChildren<{
  name: string;
}>;

const Icons = ({name}: IconProp) => {
  switch (name) {
    case 'circle':
      return <Icon name="circle-thin" size={40} color={'#03346E'} />;
    case 'cross':
      return <Icon name="times" size={40} color={'#D95F59'} />;
    case 'reset':
      return <Icon name="refresh" size={40} color={'#7FA1C3'} />;
    default:
      return <Icon name="square-o" size={40} color={'#fff'} />;
  }
};

export default Icons;
