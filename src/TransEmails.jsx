import moment from 'moment';
import React from 'react';
import {
  ArrayField,
  ArrayInput,
  BooleanField,
  BooleanInput,
  Create,
  Datagrid,
  DateField,
  DisabledInput,
  Edit,
  FunctionField,
  List,
  SimpleForm,
  SingleFieldList,
  TextField,
  TextInput,
  SimpleFormIterator,
  EmailField,
  DateInput
} from 'react-admin';
import { Typography } from '@material-ui/core';

import { Email } from '@material-ui/icons';

import { CustomReferenceField } from './components/CustomFields';

export const TransEmailIcon = Email;
const entityName = 'Transactional Emails';

// const instanceTitle = ({ instance }) => (
//   <span>
//     {entityName} - {instance ? `"${instance.fullName}"` : ''}
//   </span>
// );

export const TransEmailList = props => (
  <List {...props}>
    <Datagrid rowClick="edit">
      <TextField source="id" />
      <TextField source="name" />
      <TextField source="description" />
      <TextField source="sendgridTemplateId" />
      <TextField source="roles" />
      <BooleanField source="inactive" />
      <BooleanField source="internalBccFlg" />
      <DateField source="updatedAt" />
      <DateField source="createdAt" />
    </Datagrid>
  </List>
);

export const TransEmailEdit = props => (
  <Edit {...props}>
    <SimpleForm>
      <TextField source="id" />
      <TextInput source="name" />
      <TextInput source="description" />
      <TextInput source="sendgridTemplateId" />
      <TextField source="roles" />
      <BooleanInput source="inactive" />
      <BooleanInput source="internalBccFlg" />
      <DateField source="updatedAt" />
      <DateField source="createdAt" />
    </SimpleForm>
  </Edit>
);

export const TransEmailCreate = props => (
  <Create title={`Create ${entityName}`} {...props}>
    <SimpleForm>
      <TextInput source="name" />
    </SimpleForm>
  </Create>
);
