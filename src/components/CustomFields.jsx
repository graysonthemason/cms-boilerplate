import React, { Fragment } from 'react';
import {} from 'react-admin';
import { Link } from 'react-router-dom';

import { Chip, Tooltip, IconButton, LinearProgress } from '@material-ui/core';

import { Subject } from '@material-ui/icons';

const CustomReferenceField = ({ record, source, linkOverride }) => {
  let label;
  let tempRecord = record;
  if (typeof source === 'function') {
    label = source(record);
  } else {
    const aPath = source.split('.');
    aPath.forEach((path, index) => {
      if (!tempRecord) return null; // protects from missing record error that can arise from conflicting caches
      if (aPath.length === index + 1) {
        label = tempRecord[path];
      } else {
        tempRecord = tempRecord[path];
      }
    });
  }
  if (!record) return <LinearProgress />;

  return (
    <Fragment>
      <Chip
        clickable
        component={Link}
        to={
          linkOverride
            ? linkOverride(record)
            : `/${record.__typename}/${record.id}`
        }
        label={label}
        style={{ margin: '4px' }}
      />
    </Fragment>
  );
};

const DetailField = ({ record, source }) => {
  return (
    <Fragment>
      <Tooltip title={record[source]}>
        <IconButton aria-label={record[source]}>
          <Subject />
        </IconButton>
      </Tooltip>
    </Fragment>
  );
};

export { CustomReferenceField, DetailField };
