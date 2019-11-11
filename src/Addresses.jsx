import React from 'react';

import {
  Create,
  Datagrid,
  Edit,
  List,
  NumberField,
  NumberInput,
  ReferenceField,
  ReferenceInput,
  SelectInput,
  SimpleForm,
  TextField,
  TextInput
} from 'react-admin';

import { Place } from '@material-ui/icons';
export const AddressIcon = Place;

const entityName = 'Address';

export const AddressEdit = props => (
  <Edit {...props}>
    <SimpleForm>
      <TextInput source="address1" />
      <TextInput source="address2" />
      <TextInput source="city" />
      <TextInput source="zipcode" />
      <TextInput source="state" />
      <TextInput source="country" />
      <NumberInput source="latitude" />
      <NumberInput source="longitude" />
    </SimpleForm>
  </Edit>
);

export const AddressList = props => (
  <List {...props}>
    <Datagrid rowClick="edit">
      <TextField source="id" />
      <TextField source="address1" />
      <TextField source="address2" />
      <TextField source="city" />
      <TextField source="zipcode" />
      <TextField source="state" />
      <TextField source="country" />
      <NumberField source="latitude" />
      <NumberField source="longitude" />
    </Datagrid>
  </List>
);

export const AddressCreate = props => (
  <Create title={`Create ${entityName}`} {...props}>
    <SimpleForm>
      <TextInput source="address1" />
      <TextInput source="address2" />
      <TextInput source="city" />
      <TextInput source="zipcode" />
      <TextInput source="state" />
      <TextInput source="country" />
    </SimpleForm>
  </Create>
);
