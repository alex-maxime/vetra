import { Button, Icon, IconElement } from '@ui-kitten/components';
import React from 'react';

export const DeleteIcon = (props: any): IconElement => <Icon {...props} name="close-outline" />;

export const DeleteItemBtn = (p: any) => {
  return <Button {...p} appearance="ghost" status="danger" accessoryLeft={DeleteIcon} />;
};
