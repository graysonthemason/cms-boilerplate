import moment from 'moment';
import React, { Component, Fragment } from 'react';

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
  DateInput,
  UPDATE,
  CREATE,
  DELETE
} from 'react-admin';
import { Button, Typography } from '@material-ui/core';

import { Person } from '@material-ui/icons';

import {
  Delete,
  Done,
  ExpandMore,
  CheckCircle,
  Cancel
} from '@material-ui/icons';

import { Image, Transformation } from 'cloudinary-react';

import { CustomReferenceField } from './components/CustomFields';

import Config from './config/config';

import { openUploadWidget } from './utils/CloudinaryService';

export const UserIcon = Person;
const entityName = 'User';

// const instanceTitle = ({ instance }) => (
//   <span>
//     {entityName} - {instance ? `"${instance.fullName}"` : ''}
//   </span>
// );

export const UserList = props => (
  <List {...props}>
    <Datagrid rowClick="edit">
      <TextField source="id" />
      <TextField source="title" />
      <TextField source="firstName" />
      <TextField source="lastName" />
      <EmailField source="email" />
      <DateField source="confirmationDt" />
      <BooleanField source="demoMode" />
      <TextField source="suspended" />
      <ArrayField sortable={false} source="bookings">
        <SingleFieldList>
          <CustomReferenceField
            source={resource =>
              `${moment(resource.startDt).format('M/D/YYYY')}`
            }
          />
        </SingleFieldList>
      </ArrayField>
      <ArrayField sortable={false} label="Roles" source="accounts">
        <SingleFieldList>
          <FunctionField
            label="Icon"
            render={record => (
              <Typography gutterBottom>{record.roles}</Typography>
            )}
          />
        </SingleFieldList>
      </ArrayField>
      <ArrayField sortable={false} source="userConfigOptions">
        <SingleFieldList>
          <CustomReferenceField source="configOption.name" />
        </SingleFieldList>
      </ArrayField>
    </Datagrid>
  </List>
);

export class UserEdit extends Component {
  constructor(props, context) {
    super(props, context);
    this.state = {
      snackbarOpen: false,
      snackbarMessage: '',
      snackbarVariant: ''
    };
  }

  uploadImageWithCloudinary() {
    const uploadOptions = {
      tags: 'users',
      cloudName: Config.cloud_name,
      uploadPreset: Config.user_upload_preset
    };
    openUploadWidget(uploadOptions, (error, photos) => {
      if (!error) {
        this.onPhotosUploaded(photos);
      } else {
        console.log(error);
      }
    });
  }
  handleMakePhotoPrimary(resource) {
    return () => {
      const {
        id,
        options: { dataProvider }
      } = this.props;
      const updatedRecord = {
        id: parseInt(id, 10),
        primaryImage: resource.id
      };
      dataProvider(UPDATE, 'User', {
        data: updatedRecord
      })
        .then(() => {
          // showNotification('Images updated');
          window.location.reload();
        })
        .catch(e => {
          this.setState({
            snackbarMessage: 'Error updating images',
            snackbarOpen: true,
            snackbarVariant: 'error'
          });
        });
    };
  }
  handleRemovePhoto(resource) {
    return () => {
      const {
        id,
        options: { dataProvider }
      } = this.props;
      dataProvider(DELETE, 'UserImage', {
        userId: parseInt(id, 10),
        id: resource.id
      })
        .then(() => {
          this.setState({
            snackbarMessage: 'Image successfully removed',
            snackbarOpen: true,
            snackbarVariant: 'success'
          });
          window.location.reload();
        })
        .catch(e => {
          this.setState({
            snackbarMessage: 'Error removing image',
            snackbarOpen: true,
            snackbarVariant: 'error'
          });
          console.log(e);
        });
    };
  }
  onPhotosUploaded(photos) {
    const {
      id,
      options: { dataProvider }
    } = this.props;
    photos = photos.map(photo => {
      return { public_id: photo.public_id, url: photo.url };
    });
    dataProvider(CREATE, 'UserImage', {
      input: photos
    })
      .then(record => {
        const updatedRecord = {
          id: parseInt(id, 10),
          addImages: record.data.map(image => image.id)
        };
        dataProvider(UPDATE, 'User', {
          data: updatedRecord
        })
          .then(() => {
            window.location.reload();
          })
          .catch(e => {
            this.setState({
              snackbarMessage: 'Error updating images.',
              snackbarOpen: true,
              snackbarVariant: 'error'
            });
          });
      })
      .catch(e => {
        console.log(e);
      });
  }
  render() {
    return (
      <Edit {...this.props}>
        <SimpleForm>
          {/* <DisabledInput source="id" /> */}
          <TextInput source="firstName" />
          <TextInput source="lastName" />
          <TextInput source="email" />
          <TextInput source="title" />
          <DateInput source="confirmationDt" />
          <BooleanInput source="demoMode" />
          <BooleanInput source="suspended" />
          <ArrayInput source="bookings">
            <SimpleFormIterator>
              <DisabledInput source="id" />
              <DateInput source="startDt" />
              <DateInput source="endDt" />
            </SimpleFormIterator>
          </ArrayInput>
          <ArrayInput source="images">
            <SimpleFormIterator disableRemove={true} disableAdd={true}>
              <FunctionField
                render={record => {
                  return (
                    <Fragment>
                      <Image
                        style={{}}
                        cloud_name="dwelloptimal"
                        publicId={record.public_id}
                      >
                        <Transformation width="200" crop="scale" />
                      </Image>
                      <Button
                        color="primary"
                        style={
                          record.primaryFlg
                            ? {
                                backgroundColor: 'green',
                                color: 'white'
                              }
                            : {}
                        }
                        disabled={record.primaryFlg}
                        variant={record.primaryFlg ? 'contained' : 'outlined'}
                        onClick={this.handleMakePhotoPrimary(record)}
                      >
                        <Done color="success" />
                      </Button>
                      <Button
                        style={{ float: 'right' }}
                        onClick={this.handleRemovePhoto(record)}
                      >
                        <Delete />
                      </Button>
                    </Fragment>
                  );
                }}
              />
            </SimpleFormIterator>
          </ArrayInput>
          <div className="actions">
            <Button
              variant="outlined"
              onClick={this.uploadImageWithCloudinary.bind(this)}
            >
              Add photos
            </Button>
          </div>
          <ArrayInput source="accounts">
            <SimpleFormIterator>
              <DisabledInput source="id" />
              <DisabledInput source="roles" />
              <DisabledInput label="Name" source="account.name" />
            </SimpleFormIterator>
          </ArrayInput>
          <ArrayInput source="userConfigOptions">
            <SimpleFormIterator>
              <DisabledInput source="id" />
            </SimpleFormIterator>
          </ArrayInput>
        </SimpleForm>
      </Edit>
    );
  }
}

export const UserCreate = props => (
  <Create title={`Create ${entityName}`} {...props}>
    <SimpleForm>
      <TextInput source="name" />
    </SimpleForm>
  </Create>
);
