import React, { Component } from 'react';
import ApolloClient from 'apollo-client';
import { createHttpLink } from 'apollo-link-http';
import { InMemoryCache } from 'apollo-cache-inmemory';

import buildGraphQLProvider from 'ra-data-graphql-simple';
import {
  Admin,
  Resource,
  ShowGuesser,
  ListGuesser,
  EditGuesser
} from 'react-admin';
import withStyles from '@material-ui/core/styles/withStyles';

import theme from './theme';

// Address queries
import AddressEditQuery from './queries/AddressEdit.graphql';
import AddressListQuery from './queries/AddressList.graphql';
import AddressManyQuery from './queries/AddressMany.graphql';
import AddressUpdateMutation from './mutations/AddressUpdate.graphql';
import AddressCreateMutation from './mutations/AddressCreate.graphql';
import AddressDeleteMutation from './mutations/AddressDelete.graphql';
// Project queries
import ProjectEditQuery from './queries/ProjectEdit.graphql';
import ProjectListQuery from './queries/ProjectList.graphql';
import ProjectManyQuery from './queries/ProjectMany.graphql';
import ProjectUpdateMutation from './mutations/ProjectUpdate.graphql';
import ProjectCreateMutation from './mutations/ProjectCreate.graphql';
import ProjectDeleteMutation from './mutations/ProjectDelete.graphql';

// TransEmail queries
import TransEmailListQuery from './queries/TransEmailList.graphql';
import TransEmailManyQuery from './queries/TransEmailMany.graphql';
import TransEmailEditQuery from './queries/TransEmailEdit.graphql';
import TransEmailUpdateMutation from './mutations/TransEmailUpdate.graphql';
import TransEmailCreateMutation from './mutations/TransEmailCreate.graphql';
import TransEmailDeleteMutation from './mutations/TransEmailDelete.graphql';

// User queries
import UserListQuery from './queries/UserList.graphql';
import UserManyQuery from './queries/UserMany.graphql';
import UserEditQuery from './queries/UserEdit.graphql';
import UserUpdateMutation from './mutations/UserUpdate.graphql';
import UserCreateMutation from './mutations/UserCreate.graphql';
import UserDeleteMutation from './mutations/UserDelete.graphql';

// User image queries
import UserImageCreateMutation from './mutations/UserImageCreate.graphql';
import UserImageDeleteMutation from './mutations/UserImageDelete.graphql';

// import schema from '../schema.json';
import {
  AddressIcon,
  AddressList,
  AddressEdit,
  AddressCreate
} from './Addresses';

import {
  TransEmailIcon,
  TransEmailList,
  TransEmailEdit,
  TransEmailCreate
} from './TransEmails';

import { UserIcon, UserList, UserEdit, UserCreate } from './Users';

// import authProvider from './authProvider';

import { filterInput } from './utils/global';

const styles = {
  root: {}
};

const buildQuery = introspection => (fetchType, resourceName, params) => {
  // const builtQuery = buildQuery(introspection)(fetchType, resourceName, params);
  const { data } = params;
  // const resource = introspection.types.find(r => r.name === resourceName);
  let returnObj;
  let input;
  switch (resourceName) {
    case 'Address':
      switch (fetchType) {
        case 'GET_LIST':
          returnObj = {
            query: AddressListQuery,
            variables: params, // params = { id: ... }
            parseResponse: response => ({
              data: response.data.allAddresses.rows,
              total: response.data.allAddresses.count
            })
          };
          break;
        case 'GET_MANY':
          returnObj = {
            query: AddressManyQuery,
            parseResponse: response => ({
              data: response.data.allAddresses,
              total: response.data.allAddresses.length
            })
          };
          break;
        case 'GET_ONE':
          returnObj = {
            query: AddressEditQuery,
            variables: { id: parseInt(params.id, 10) },
            parseResponse: response => {
              return {
                data: response.data.address
              };
            }
          };
          break;
        case 'CREATE':
          input = data;
          returnObj = {
            query: AddressCreateMutation,
            variables: {
              input
            },
            parseResponse: response => ({
              data: response.data.createAddress
            })
          };
          break;
        case 'UPDATE':
          input = filterInput('UpdateAddressInput', data, introspection.types);
          returnObj = {
            query: AddressUpdateMutation,
            variables: {
              input
            },
            parseResponse: response => {
              return {
                data: response.data.updateAddress
              };
            }
          };
          break;
        case 'DELETE':
          returnObj = {
            query: AddressDeleteMutation,
            variables: {
              id: params.id
            },
            parseResponse: response => ({
              data: response.data.deleteAddress
            })
          };
          break;
        default:
          console.log('query not set up!', resourceName, fetchType);
          break;
      }
      break;
    case 'Project':
      switch (fetchType) {
        case 'GET_LIST':
          returnObj = {
            query: ProjectListQuery,
            variables: params, // params = { id: ... }
            parseResponse: response => ({
              data: response.data.allProjects.rows,
              total: response.data.allProjects.count
            })
          };
          break;
        case 'GET_MANY':
          returnObj = {
            query: ProjectManyQuery,
            parseResponse: response => ({
              data: response.data.allProjects,
              total: response.data.allProjects.length
            })
          };
          break;
        case 'GET_ONE':
          returnObj = {
            query: ProjectEditQuery,
            variables: { id: parseInt(params.id, 10) },
            parseResponse: response => {
              return {
                data: response.data.address
              };
            }
          };
          break;
        case 'CREATE':
          input = data;
          returnObj = {
            query: ProjectCreateMutation,
            variables: {
              input
            },
            parseResponse: response => ({
              data: response.data.createProject
            })
          };
          break;
        case 'UPDATE':
          input = filterInput('UpdateProjectInput', data, introspection.types);
          returnObj = {
            query: ProjectUpdateMutation,
            variables: {
              input
            },
            parseResponse: response => {
              return {
                data: response.data.updateProject
              };
            }
          };
          break;
        case 'DELETE':
          returnObj = {
            query: ProjectDeleteMutation,
            variables: {
              id: params.id
            },
            parseResponse: response => ({
              data: response.data.deleteProject
            })
          };
          break;
        default:
          console.log('query not set up!', resourceName, fetchType);
          break;
      }
      break;
    case 'TransEmail':
      switch (fetchType) {
        case 'GET_LIST':
          returnObj = {
            query: TransEmailListQuery,
            variables: params, // params = { id: ... }
            parseResponse: response => ({
              data: response.data.allTransEmails.rows,
              total: response.data.allTransEmails.count
            })
          };
          break;
        case 'GET_MANY':
          returnObj = {
            query: TransEmailManyQuery,
            parseResponse: response => ({
              data: response.data.allTransEmails,
              total: response.data.allTransEmails.length
            })
          };
          break;
        case 'GET_ONE':
          returnObj = {
            query: TransEmailEditQuery,
            variables: { id: parseInt(params.id, 10) },
            parseResponse: response => ({
              data: response.data.transEmail
            })
          };
          break;
        case 'CREATE':
          let input = data;
          returnObj = {
            query: TransEmailCreateMutation,
            variables: {
              name: input.name
            },
            parseResponse: response => ({
              data: response.data.createTransEmail
            })
          };
          break;
        case 'UPDATE':
          input = filterInput(
            'UpdateTransEmailInput',
            data,
            introspection.types
          );
          returnObj = {
            query: TransEmailUpdateMutation,
            variables: {
              input
            },
            parseResponse: response => {
              return {
                data: response.data.updateTransEmail
              };
            }
          };
          break;
        case 'DELETE':
          returnObj = {
            query: TransEmailDeleteMutation,
            variables: {
              id: params.id
            },
            parseResponse: response => ({
              data: response.data.deleteTransEmail
            })
          };
          break;
        default:
          console.log('query not set up!', resourceName, fetchType);
          break;
      }
      break;
    case 'User':
      switch (fetchType) {
        case 'GET_LIST':
          returnObj = {
            query: UserListQuery,
            variables: params, // params = { id: ... }
            parseResponse: response => ({
              data: response.data.allUsers.rows,
              total: response.data.allUsers.count
            })
          };
          break;
        case 'GET_MANY':
          returnObj = {
            query: UserManyQuery,
            parseResponse: response => ({
              data: response.data.allUsers,
              total: response.data.allUsers.length
            })
          };
          break;
        case 'GET_ONE':
          returnObj = {
            query: UserEditQuery,
            variables: { id: parseInt(params.id, 10) },
            parseResponse: response => ({
              data: response.data.user
            })
          };
          break;
        case 'CREATE':
          let input = params.data;
          returnObj = {
            query: UserCreateMutation,
            variables: {
              input
            },
            parseResponse: response => ({
              data: response.data.createUser
            })
          };
          break;
        case 'UPDATE':
          input = filterInput('UpdateUserInput', data, introspection.types);
          returnObj = {
            query: UserUpdateMutation,
            variables: {
              input
            },
            parseResponse: response => {
              return {
                data: response.data.updateUser
              };
            }
          };
          break;
        case 'DELETE':
          returnObj = {
            query: UserDeleteMutation,
            variables: {
              id: params.id
            },
            parseResponse: response => ({
              data: response.data.deleteUser
            })
          };
          break;
        default:
          console.log('query not set up!', resourceName, fetchType);
          break;
        // ... other types handled here
      }
      break;
    case 'UserImage':
      switch (fetchType) {
        case 'CREATE':
          const { input } = params;
          returnObj = {
            query: UserImageCreateMutation,
            variables: {
              input
            },
            parseResponse: response => ({
              data: response.data.createUserImage
            })
          };
          break;
        case 'DELETE':
          returnObj = {
            query: UserImageDeleteMutation,
            variables: {
              id: params.id,
              userId: params.userId
            },
            parseResponse: response => ({
              data: response.data.deleteUserImage
            })
          };
          break;
        default:
          console.log('query not set up!', resourceName, fetchType);
          break;
        // ... other types handled here
      }
      break;
    default:
      console.log('query not set up!', resourceName, fetchType);
      break;
  }
  return returnObj;
};

class AdminHome extends Component {
  constructor(props) {
    super(props);
    this.state = {};
  }

  componentDidMount() {
    const introspectionOptions = {
      include: ['Address', 'User', 'TransEmail']
    };
    const client = new ApolloClient({
      link: createHttpLink({
        // fetchOptions: {
        //   credentials: 'include'
        // },
        // credentials: 'include',
        uri: `${process.env.REACT_APP_API_PATH}/graphql`
      }),
      cache: new InMemoryCache(),
      dataIdFromObject: o => o.id // every object runs through this and determines the id as the id attribute
    });
    buildGraphQLProvider({
      client,
      introspection: introspectionOptions,
      buildQuery
    })
      .then(dataProvider => this.setState({ dataProvider, client }))
      .catch(e => {
        console.log(e);
      });
  }

  render() {
    // const { classes } = this.props;
    const { dataProvider } = this.state;
    if (!dataProvider) {
      return <div>Loading</div>;
    }
    return (
      <Admin
        theme={theme}
        dataProvider={dataProvider}
        // authProvider={authProvider(this.state.client)}
        title="DWELL Admin"
      >
        <Resource
          name="Address"
          icon={AddressIcon}
          edit={AddressEdit}
          list={AddressList}
          show={ShowGuesser}
          create={AddressCreate}
        />
        <Resource
          name="UserImage"
          // icon={RoomIcon}
          // list={RoomList}
          // list={ListGuesser}
          // edit={EditGuesser}
          // edit={RoomEdit}
          // show={ShowGuesser}
          options={{ dataProvider }}
          // create={EditGuesser}
        />
        <Resource
          name="TransEmail"
          icon={TransEmailIcon}
          edit={TransEmailEdit}
          list={TransEmailList}
          show={ShowGuesser}
          create={TransEmailCreate}
          options={{ dataProvider, label: 'Transactional Emails' }}
        />
        <Resource
          name="User"
          icon={UserIcon}
          // edit={EditGuesser}
          edit={UserEdit}
          list={UserList}
          show={ShowGuesser}
          create={UserCreate}
          options={{ dataProvider }}
        />
      </Admin>
    );
  }
}

AdminHome.propTypes = {
  // classes: PropTypes.object.isRequired,
};

export default withStyles(styles, {
  withTheme: true
})(AdminHome);
