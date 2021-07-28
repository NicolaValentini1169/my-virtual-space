import React, { useMemo } from 'react';
import { capitalizeFirstLetter, isString } from '../../utils/utils';
import TextInput from './input/text';
import OptionInput from './input/option';

const CompactData = ({ data, column, isChanging = false, stateList }) => {
  const { label, width, path, editableType } = column;

  const getValue = useMemo(() => {
    if (isString(path) && path.includes('.')) {
      return (
        path.split('.').reduce((acc, split) => {
          return data[split] || acc[split] || '';
        }, '') || ''
      );
    }

    if (isString(path) && isString(data[path])) {
      return data[path];
    }

    return '';
  }, [data, path]);

  const renderInput = useMemo(() => {
    if (isString(editableType) && editableType === 'text') {
      return (
        <TextInput
          changeFunc={e => {
            console.log('xxe', e.currentTarget.value);
            data[path] = e.currentTarget.value;
          }}
          name={path}
          placeholder="Inserisci valore"
          value={getValue}
        />
      );
    }

    if (isString(editableType) && editableType === 'state') {
      return (
        <OptionInput
          name={path}
          changeFunc={e => (data[path] = e.currentTarget.value)}
          list={stateList}
          field="descrizione"
          selected={data['state']?.id}
        />
      );
    }

    return '';
  }, [editableType, path, data, getValue, stateList]);

  const renderValue = useMemo(() => (isChanging ? renderInput : getValue), [
    getValue,
    isChanging,
    renderInput,
  ]);

  return (
    <div style={{ width, padding: '5px' }}>
      <div style={{ fontWeight: 'bold' }}>{capitalizeFirstLetter(label)}</div>
      <div>{renderValue}</div>
    </div>
  );
};

export default CompactData;
